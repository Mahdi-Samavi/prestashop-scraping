import datetime
from .Controller import Controller
from Models import Store, Schema, Product


class ProductController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def index(self):
        if not self.session.query(Store).first():
            self.log.warning('No stores have been added yet')
            return self.invalid_response('No stores have been added yet. First you need to add at least one store')

        if not self.session.query(Schema).first():
            self.log.warning('No schemas have been added yet')
            return self.invalid_response('No schemas have been added yet. First you need to add at least one store')

        products = self.session.query(Product).all()

        data = list()
        for product in products:
            prod = {x.name: getattr(product, x.name)
                    for x in product.__table__.columns}
            prod['store'] = product.store.name
            prod['schema'] = product.schema.name
            data.append(prod)

        return self.valid_response(data=data)

    def create(self):
        data = {'stores': [], 'schemas': []}
        stores = self.session.query(Store).all()
        schemas = self.session.query(Schema).all()

        for store in stores:
            data['stores'].append({'id': store.id, 'name': store.name})
        for schema in schemas:
            data['schemas'].append(
                {'id': schema.id, 'name': schema.name})

        return self.valid_response(data=data)

    def add(self, product):
        if self._check_url(product['page_url']):
            msg = 'The URL of the product page in the main store is invalid.'
            self.log.error(msg)
            return self.invalid_response(msg)

        product['set_discounted_price'] = 'set_discounted_price' in product
        product['ignore_manipulation'] = 'ignore_manipulation' in product
        product['status'] = 'status' in product
        product['created_at'] = datetime.datetime.now()

        self.session.add(Product(**product))
        self.session.commit()

        msg = 'The product has been successfully added.'
        self.log.info(msg + ' name: ' + product['name'])
        return self.valid_response(msg)

    def get(self, product_id):
        product = self.session.query(Product).get(product_id)
        stores = self.session.query(Store).all()
        schemas = self.session.query(Schema).all()

        data = {x.name: getattr(product, x.name)
                for x in product.__table__.columns}

        data['stores'] = []
        for store in stores:
            data['stores'].append({'id': store.id, 'name': store.name})

        data['schemas'] = []
        for schema in schemas:
            data['schemas'].append(
                {'id': schema.id, 'name': schema.name})

        self.log.info('Editing the product. name: ' + data['name'])
        return self.valid_response(data=data)

    def edit(self, product_id, data):
        if self._check_url(data['page_url']):
            msg = 'The URL of the product page in the main store is invalid.'
            self.log.error(msg)
            return self.invalid_response(msg)

        data['set_discounted_price'] = 'set_discounted_price' in data
        data['ignore_manipulation'] = 'ignore_manipulation' in data
        data['status'] = 'status' in data
        data['updated_at'] = datetime.datetime.now()

        self.session.query(Product).filter_by(id=product_id).update(data)
        self.session.commit()

        msg = 'The product was edited successfully.'
        self.log.info(msg + ' name: ' + data['name'])
        return self.valid_response(msg, {'name': data['name']})

    def destroy(self, product_id):
        self.session.query(Product).filter_by(id=product_id).delete()
        self.session.commit()

        msg = 'The product was successfully deleted.'
        self.log.info(msg)
        return self.valid_response(msg)
