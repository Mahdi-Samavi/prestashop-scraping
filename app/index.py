import sys
import json
from Controllers.LogController import LogController

if __name__ == '__main__':
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
