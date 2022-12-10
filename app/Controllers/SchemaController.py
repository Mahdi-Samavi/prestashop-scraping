import datetime
from .Controller import Controller
from Models import Schema


class SchemaController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def index(self):
        schemas = self.session.query(Schema).all()

        data = list()
        for schema in schemas:
            data.append({x.name: getattr(schema, x.name)
                        for x in schema.__table__.columns})

        return self.valid_response(data=data)

    def create(self):
        data = {'schemas': []}
        schemas = self.session.query(Schema).all()

        for schema in schemas:
            data['schemas'].append(
                {'id': schema.id, 'name': schema.name})

        return self.valid_response(data=data)

    def add(self, schema):
        schema['created_at'] = datetime.datetime.now()

        self.session.add(Schema(**schema))
        self.session.commit()

        msg = 'The schema has been successfully added.'
        self.log.info(msg + ' name: ' + schema['name'])
        return self.valid_response(msg)

    def get(self, schema_id):
        schema = self.session.query(Schema).get(schema_id)

        data = {x.name: getattr(schema, x.name)
                for x in schema.__table__.columns}

        self.log.info('Editing the schema. name: ' + data['name'])
        return self.valid_response(data=data)

    def edit(self, schema_id, data):
        data['updated_at'] = datetime.datetime.now()

        self.session.query(Schema).filter_by(id=schema_id).update(data)
        self.session.commit()

        msg = 'The schema was edited successfully.'
        self.log.info(msg + ' name: ' + data['name'])
        return self.valid_response(msg, {'name': data['name']})

    def destroy(self, schema_id):
        self.session.query(Schema).filter_by(id=schema_id).delete()
        self.session.commit()

        msg = 'The schema was successfully deleted.'
        self.log.info(msg)
        return self.valid_response(msg)
