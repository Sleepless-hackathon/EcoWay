from flask import Blueprint, render_template
from . import db
from .models import SomeValue
import random

index = Blueprint('index', __name__)


@index.route('/')
def index_endpoint():
    r = "values:<br/>"
    db_cont = SomeValue.query.all()
    for e in db_cont:
        r += e.__repr__() + "<br/>"

    return r


@index.route('/add_value/<string:val>')
def add_value(val):
    new_entry = SomeValue(str_value=val, random_int=random.randint(0, 42))
    db.session.add(new_entry)
    db.session.commit()

    return "ok"
