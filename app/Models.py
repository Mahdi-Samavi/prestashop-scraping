from os import path, environ
from sqlalchemy import create_engine, event, Column, ForeignKey, Integer, Float, Enum, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.types import TypeDecorator


# Database initial data
INITIAL_DATA = {
    'settings': [
        {'name': 'crawler', 'value': ''},
        {'name': 'crawling', 'value': False},
        {'name': 'delay_check', 'value': '10'},
        {'name': 'crawling_day', 'value': '1'},
        {'name': 'crawling_time', 'value': '1'}
    ],
}

DATABASE = path.join(environ['APPDATA'],
                     'prestashop-scraping', 'Database', 'database')

engine = create_engine('sqlite:///' + DATABASE, echo=False, future=True)
Base = declarative_base()


class DateTime(TypeDecorator):
    impl = DateTime

    cache_ok = True

    def process_result_value(self, value, dialect):
        return '--' if value is None else value.strftime('%Y-%m-%d %H:%M:%S')


class Setting(Base):
    __tablename__ = 'settings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    value = Column(String, nullable=False)


class Store(Base):
    __tablename__ = 'stores'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    version = Column(String, nullable=True)
    admin_url = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    status = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, nullable=True)

    products = relationship('Product', back_populates='store')


class Schema(Base):
    __tablename__ = 'schemas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    regular_price_element = Column(String, nullable=False)
    discounted_element = Column(String, nullable=True)
    discount_element = Column(String, nullable=True)
    round_type = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, nullable=True)

    products = relationship('Product', back_populates='schema')


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    store_id = Column(Integer, ForeignKey('stores.id'))
    schema_id = Column(Integer, ForeignKey('schemas.id'))
    name = Column(String(30), nullable=False)
    page_url = Column(String, nullable=False)
    set_discounted_price = Column(Boolean, nullable=False)
    ignore_manipulation = Column(Boolean, nullable=False)
    manipulation_amount = Column(Float, nullable=True)
    manipulation_type = Column(Integer, nullable=False)
    manipulation_side = Column(Integer, nullable=False)
    status = Column(Boolean, nullable=False)
    crawled_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, nullable=True)

    store = relationship('Store', back_populates='products')
    schema = relationship('Schema', back_populates='products')


@event.listens_for(Setting.__table__, 'after_create')
def receive_after_create(target, connection, **kw):
    connection.execute(target.insert(), INITIAL_DATA[str(target)])
