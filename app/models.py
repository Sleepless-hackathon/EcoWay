from . import db


class SomeValue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    str_value = db.Column(db.String(100))
    random_int = db.Column(db.Integer)

    def __repr__(self):
        return f"Something: id={self.id}, str={self.str_value}, random={self.random_int}"
