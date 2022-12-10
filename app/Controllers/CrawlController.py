from os import kill
from signal import SIGINT
from Crawler import Crawler
from .Controller import Controller
from .SettingController import SettingController


class CrawlController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def handle(self, status, pid=None):
        SettingController.setter(self, 'crawling', status)

        proc = Crawler(self.log, self.session)

        if not status and pid:
            kill(pid, SIGINT)
            self.log.info('Crawler disabled successfully.')
        else:
            proc.start()
            self.log.info('Crawler enabled successfully.')

        msg = f"Crawling status has been {'activated' if status else 'disabled'} successfully"
        return self.valid_response(msg, {'pid': proc.pid})
