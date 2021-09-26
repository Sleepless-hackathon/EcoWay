from flask import Blueprint, render_template, request
import json
from . import osmap_utils

index = Blueprint('index', __name__)


@index.route('/')
def index_endpoint():
    return render_template("index.html")


@index.route('/get_cords', methods=['POST'])
def get_cords():
    body = request.data.decode()

    finder = osmap_utils.StreetSearcher(city="")
    cord = finder.query_cords(body)

    if len(cord) < 1:
        return json.dumps({"lat": 0, "lng": 0})

    cord = cord[0].get_cord()

    return json.dumps({"lat": cord[0], "lng": cord[1]})
