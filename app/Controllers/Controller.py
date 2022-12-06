import json
from Models import engine
from sqlalchemy.orm import Session
from .LogController import LogController


class Controller:
    def __init__(self) -> None:
        self.log = LogController()
        self.session = Session(engine)

    def valid_response(self, msg='', data=None):
        print(json.dumps({'success': True, 'message': msg, 'data': data}))

    def invalid_response(self, msg=''):
        print(json.dumps({'success': False, 'message': msg}))

    def _check_url(self, url):
        return not (url.find('http://') == 0 or url.find('https://') == 0)
