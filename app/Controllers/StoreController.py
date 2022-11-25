import datetime
from .Controller import Controller
from Models import Store


class StoreController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def _check_url(self, url):
        return not (url.find('http://') == 0 or url.find('https://') == 0)

    def index(self):
        stores = self.session.query(Store).all()

        data = list()
        for store in stores:
            data.append({x.name: getattr(store, x.name)
                        for x in store.__table__.columns})

        return self.valid_response(data=data)

    def add(self, store):
        if self._check_url(store['admin_url']):
            return self.invalid_response('The URL of the store admin page is invalid.')

        now = datetime.datetime.now()

        store['status'] = 'status' in store
        store['created_at'] = now
        store['updated_at'] = now

        self.session.add(Store(**store))
        self.session.commit()

        return self.valid_response("The store has been successfully added.")

    def get(self, store_id):
        store = self.session.query(Store).get(store_id)
        return self.valid_response({
            'id': store.id,
            'name': store.name,
            'admin_url': store.admin_url,
            'email': store.email,
            'status': store.status,
            'created_at': store.created_at,
            'updated_at': store.updated_at
        })

    def edit(self, store_id, data):
        if self._check_url(data['admin_url']):
            return self.invalid_response('The URL of the store admin page is invalid.')

        self.session.query(Store).filter(Store.id == store_id).update({
            'name': data['name'],
            'admin_url': data['admin_url'],
            'email': data['email'],
            'password': data['password'],
            'status': 'status' in data,
            'updated_at': datetime.datetime.now()
        })
        self.session.commit()

        return self.valid_response("The store was edited successfully", {'name': data['name']})

    def destroy(self, store_id):
        self.session.query(Store).filter(Store.id == store_id).delete()
        self.session.commit()

        return self.valid_response("The store was successfully deleted")
