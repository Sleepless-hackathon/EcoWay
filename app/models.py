from . import db


class SomeValue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    str_value = db.Column(db.String(100))
    random_int = db.Column(db.Integer)

    def __repr__(self):
        return f"Something: id={self.id}, str={self.str_value}, random={self.random_int}"


class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.Integer)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    aqi = db.Column(db.Float)

    def __repr__(self):
        return f"Sensor record: id={self.id}, aqi={self.aqi}; location ({self.lat}, {self.lng})"
