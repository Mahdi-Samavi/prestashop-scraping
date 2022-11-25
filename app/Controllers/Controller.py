from sqlalchemy.orm import Session
from Models import engine
import json


class Controller:
    def __init__(self) -> None:
        self.session = Session(engine)

    def valid_response(self, msg='', data=None):
        print(json.dumps({'success': True, 'message': msg, 'data': data}))

    def invalid_response(self, msg=''):
        print(json.dumps({'success': False, 'message': msg}))
