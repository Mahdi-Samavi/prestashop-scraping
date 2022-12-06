import datetime
from .Controller import Controller
from Models import Store


class StoreController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def index(self):
        stores = self.session.query(Store).all()

        data = list()
        for store in stores:
            data.append({x.name: getattr(store, x.name)
                        for x in store.__table__.columns})

        return self.valid_response(data=data)

    def add(self, store):
        if self._check_url(store['admin_url']):
            msg = 'The URL of the store admin page is invalid.'
            self.log.error(msg)
            return self.invalid_response(msg)

        store['status'] = 'status' in store
        store['created_at'] = datetime.datetime.now()

        self.session.add(Store(**store))
        self.session.commit()

        msg = 'The store has been successfully added.'
        self.log.info(msg + ' name: ' + store['name'])
        return self.valid_response(msg)

    def get(self, store_id):
        store = self.session.query(Store).get(store_id)
        data = {x.name: getattr(store, x.name)
                for x in store.__table__.columns}

        self.log.info('Editing the store. name: ' + data['name'])
        return self.valid_response(data=data)

    def edit(self, store_id, data):
        if self._check_url(data['admin_url']):
            msg = 'The URL of the store admin page is invalid.'
            self.log.error(msg)
            return self.invalid_response(msg)

        self.session.query(Store).filter_by(id=store_id).update({
            'name': data['name'],
            'admin_url': data['admin_url'],
            'email': data['email'],
            'password': data['password'],
            'status': 'status' in data,
            'updated_at': datetime.datetime.now()
        })
        self.session.commit()

        msg = 'The store was edited successfully.'
        self.log.info(msg + ' name: ' + data['name'])
        return self.valid_response(msg, {'name': data['name']})

    def destroy(self, store_id):
        self.session.query(Store).filter_by(id=store_id).delete()
        self.session.commit()

        msg = 'The store was successfully deleted.'
        self.log.info(msg)
        return self.valid_response(msg)
