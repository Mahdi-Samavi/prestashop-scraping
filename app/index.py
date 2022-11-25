import sys
import json

if __name__ == '__main__':
    controller, action = sys.argv[1].split('@', 2)

    controller = getattr(
        __import__(f'Controllers.{controller}', fromlist=controller),
        controller
    )
    method = getattr(controller(), action)

    method(*json.loads(sys.argv[2])) if len(sys.argv) > 2 else method()
