import json
import logging
from os import path, environ
from datetime import date


class LogController:
    def __init__(self) -> None:
        self.logger = logging.getLogger()
        self.filename = path.join(
            environ['APPDATA'], 'prestashop-scraping', 'Logs', f'{str(date.today())}.log')

        logging.basicConfig(filename=self.filename,
                            format='%(asctime)s - %(levelname)s - %(message)s',
                            datefmt='%Y-%m-%d %H:%M:%S',
                            level=logging.INFO,
                            encoding='UTF-8')

    def get(self):
        lines = ''
        with open(self.filename, encoding="utf8") as f:
            for line in (f.readlines()[-40:]):
                if '- INFO -' in line:
                    lines += self._line_wrapper(line, 'blue')
                elif '- WARNING -' in line:
                    lines += self._line_wrapper(line, 'orange')
                elif '- ERROR -' in line:
                    lines += self._line_wrapper(line, 'red')
                elif '- CRITICAL -' in line:
                    lines += self._line_wrapper(line, 'gold')
                else:
                    lines += line

        print(json.dumps({'data': lines}))

    def _line_wrapper(self, line, color):
        return '<span style="color:' + color + '">' + line + '</span>'

    def debug(self, msg, *args, **kwargs):
        self.logger.debug(msg, *args, **kwargs)

    def info(self, msg, *args, **kwargs):
        self.logger.info(msg, *args, **kwargs)

    def warning(self, msg, *args, **kwargs):
        self.logger.warning(msg, *args, **kwargs)

    def error(self, msg, *args, **kwargs):
        self.logger.error(msg, *args, **kwargs)

    def critical(self, msg, *args, **kwargs):
        self.logger.critical(msg, *args, **kwargs)
