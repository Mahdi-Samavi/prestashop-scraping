from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.types import TypeDecorator

engine = create_engine("sqlite:///database.sqlite", echo=False, future=True)
Base = declarative_base()


class DateTime(TypeDecorator):
    impl = DateTime

    cache_ok = True

    def process_result_value(self, value, dialect):
        return value.strftime('%Y-%m-%d %H:%M:%S')


class Store(Base):
    __tablename__ = 'stores'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    admin_url = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    status = Column(Boolean, nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    admin_url = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


if __name__ == '__main__':
    Base.metadata.create_all(engine)
