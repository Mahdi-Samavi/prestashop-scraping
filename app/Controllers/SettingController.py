from .Controller import Controller
from Models import Setting


class SettingController(Controller):
    def __init__(self) -> None:
        super().__init__()

    def getter(self, name=None, echo=True):
        setting = self.session.query(Setting)
        data = setting.filter_by(name=name).one() if name else setting.all()
        data = data.value if name else {
            row.name: row.value for row in data}

        return self.valid_response(data=data) if echo else data

    def setter(self, name, value):
        self.session.query(Setting).filter_by(
            name=name).update({'value': value})
        self.session.commit()

        self.log.info(f'The value of {name} changed to {value}.')

    def editAll(self, settings):
        for name, value in settings.items():
            self.session.query(Setting).filter_by(
                name=name).update({'value': value})
        self.session.commit()

        msg = 'Settings changed.'
        self.log.info(msg)
        return self.valid_response(msg)
