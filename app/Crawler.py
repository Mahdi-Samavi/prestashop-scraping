import re
import math
import datetime
from time import sleep
from Models import engine, Store, Product
from psutil import Process as UProcess
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from sqlalchemy.orm import Session
from multiprocessing import Process
from Controllers.LogController import LogController
from Controllers.SettingController import SettingController


class Crawler(Process):
    def __init__(self, log, session) -> None:
        super().__init__()
        # self.log = log
        # self.session = session

    def run(self):
        self.log = LogController()
        self.session = Session(engine)
        delay_check = SettingController().getter('delay_check', False)

        while True:
            try:
                if True:
                    self.crawl()
            except BaseException as error:
                self.log.error(error)

            sleep(int(delay_check) * 60)

    def init_browser(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--mute-audio')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-gpu')
        options.add_argument('--log-level=OFF')
        options.add_argument('--disable-extensions')
        options.add_argument('--window-size=1920x1080')
        options.add_argument('--disable-dev-shm-usage')

        options.add_argument('disable-infobars')

        self.driver = webdriver.Chrome(
            options=options, service=ChromeService(ChromeDriverManager().install()))

        SettingController().setter('crawler', self.driver.service.process.pid)

    def crawl(self):
        self.init_browser()
        stores = self.session.query(Store).filter_by(status=True).all()

        for store in stores:
            self.store = store
            self._product_store_admin()

            for product in self.session.query(Product).filter_by(store_id=store.id, status=True).all():
                self.product = product
                self.schema = product.schema
                self._update_product()

            self._switch_to_store_admin()

        self.driver.quit()

    def _product_store_admin(self):
        self.driver.get(self.store.admin_url)

        # Get version
        version = WebDriverWait(self.driver, 40).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '#login-header > div.text-center'))).text

        # Update version
        if self.store.version != version:
            self._update_version(version)

        # Email field
        email = self.driver.find_element(By.ID, 'email')
        email.send_keys(self.store.email)

        # Passwd field
        passwd = self.driver.find_element(By.ID, 'passwd')
        passwd.send_keys(self.store.password)

        passwd.submit()
        self.log.info(
            f'{self.store.name}: The robot entered the store management section.')

        # Click on catalog link
        WebDriverWait(self.driver, 40).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '#subtab-AdminCatalog > .link'))
        ).click()

        # Click on products link
        WebDriverWait(self.driver, 40).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '#subtab-AdminProducts > .link'))
        ).click()
        self.log.info(
            f'{self.store.name}: The robot entered the product management page.')

        # Reset catagory filter
        WebDriverWait(self.driver, 40).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '#product_catalog_category_tree_filter'))
        ).click()

        WebDriverWait(self.driver, 40).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, '#product_catalog_category_tree_filter_reset'))
        ).click()
        self.log.info(
            f'{self.store.name}: The filter is back to its original state.')

    def _update_product(self):
        self._new_tab('scrap-tab')
        self.driver.get(self.product.page_url)

        discount = self.driver.find_elements(
            By.XPATH, self.schema.discount_element)

        if len(discount):
            price = discount[0].text if self.product.set_discounted_price else self.driver.find_element(
                By.XPATH, self.schema.discounted_element).text
        else:
            price = self.driver.find_element(
                By.XPATH, self.schema.regular_price_element).text

        price = re.sub("[^0-9]", "", price)

        # The current page of the product is closed
        # self.driver.close()

        # Switch to admin products page
        self._switch_to_store_admin()

        # Filter product
        self._filter_product_store_admin(self.product.name)

        # Open editing product page
        product_url = self.driver.find_element(
            By.CSS_SELECTOR, 'a.product-edit').get_attribute('href')
        self._new_tab('product:edit')
        self.driver.get(product_url)

        price_field = self.driver.find_element(
            By.ID, 'form_step1_price_ttc_shortcut')
        old_price = float(price_field.get_attribute('value'))
        new_price = self._price_manipulation(float(price))

        # Ignore manipulation price
        if len(discount) and self.product.set_discounted_price and self.product.ignore_manipulation:
            new_price = float(price)

        new_price = self._round_price(new_price)

        if old_price == new_price:
            self.log.info(
                f'{self.store.name}: Product {self.product.name} was already updated')
            # self.driver.close()
            return

        price_field.clear()
        price_field.send_keys(new_price)

        submit_btn = self.driver.find_element(By.CSS_SELECTOR, '#submit')
        if submit_btn.is_displayed():
            submit_btn.click()
        else:
            self.driver.find_element(
                By.CSS_SELECTOR, '#form button.btn-primary[type="submit"]').click()

        self.log.info(
            f'{self.store.name}: The price of product {self.product.name} changed from {old_price} to {new_price}')

        self.session.query(Product).filter_by(id=self.product.id).update(
            {'crawled_at': datetime.datetime.now()})
        self.session.commit()

        sleep(1)
        # self.driver.close()

    def _new_tab(self, name):
        self.driver.execute_script(f'window.open("about:blank", "{name}")')
        self.driver.switch_to.window(name)

    def _price_manipulation(self, price):
        amount = float(self.product.manipulation_amount)
        side = self.product.manipulation_side

        def percentage_inc(price, amount): return (
            price + (price * amount / 100))
        def percentage_dec(price, amount): return (
            price - (price * amount / 100))

        match self.product.manipulation_type:
            case 1:
                return percentage_inc(price, amount) if side == 1 else percentage_dec(price, amount)
            case 2:
                return price + amount if side == 1 else price - amount

    def _round_price(self, price):
        match self.schema.round_type:
            case 1:  # No rounding
                return price
            case 2:  # Round up
                return math.ceil(price)
            case 3:  # Normal rounding
                return round(price)
            case 4:  # Round down
                return math.floor(price)

    def _update_version(self, version):
        self.session.query(Store).filter_by(
            id=self.store.id).update({'version': version})
        self.session.commit()
        self.log.info(
            f'{self.store.name}: The store admin version was updated.')

    def _switch_to_store_admin(self):
        self.driver.switch_to.window(self.driver.window_handles[0])

    def _filter_product_store_admin(self, name):
        reset = self.driver.find_element(
            By.CSS_SELECTOR, 'button[name="products_filter_reset"]')
        if reset.is_displayed():
            reset.click()

        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, 'input[name="filter_column_name"]'))).send_keys(name)

        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, 'button[name="products_filter_submit"]'))).click()

    def __del__(self):
        pid = SettingController().getter('crawler', False)
        proc = UProcess(int(pid))

        for child in proc.children(True):
            if child.is_running():
                child.kill()

        if proc.is_running():
            proc.kill()
