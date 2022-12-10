import sys
import json
from Models import Base, engine
from os import path, environ, makedirs
from multiprocessing import freeze_support
from Controllers.LogController import LogController


def _prepare_appdata():
    appdata_dir = path.join(environ['APPDATA'], 'prestashop-scraping')
    db_dir = path.join(appdata_dir, 'Database')
    log_dir = path.join(appdata_dir, 'Logs')

    if path.exists(db_dir) and path.exists(log_dir):
        return

    makedirs(db_dir, exist_ok=True)
    makedirs(log_dir, exist_ok=True)

    Base.metadata.create_all(engine)


if __name__ == '__main__':
    freeze_support()
    _prepare_appdata()

    controller, action = sys.argv[1].split('@', 2)

    controller = getattr(
        __import__(f'Controllers.{controller}', fromlist=controller),
        controller
    )
    method = getattr(controller(), action)

    try:
        method(*json.loads(sys.argv[2])) if len(sys.argv) > 2 else method()
    except BaseException as error:
        LogController().error(error)
