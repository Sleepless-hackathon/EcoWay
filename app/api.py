from flask import Blueprint, render_template, request
import json
from . import osmap_utils
import keras

api = Blueprint('api', __name__, url_prefix="/api")

air_model = keras.models.load_model("data_prepare/cords_to_score_model")


@api.route('/get_cords', methods=['POST'])
def get_cords():
    body = request.data.decode()

    finder = osmap_utils.StreetSearcher(city="")
    cord = finder.query_any(body, raw=True)

    if len(cord) < 1:
        return json.dumps({"lat": 0, "lng": 0})

    cord = cord[0].get_cord()

    return json.dumps({"lat": cord[0], "lng": cord[1]})


@api.route('/get_score', methods=['POST'])
def get_score():
    json_data = request.get_json()

    score = "0"

    if "lat" in json_data and "lng" in json_data:
        result = air_model.predict([[json_data["lat"], json_data["lng"]]])

        if len(result) <= 0:
            return "Internal Server Error ", 500

        score = int(result[0][0].round())
    else:
        return "400 Bad Request", 400

    return json.dumps({"score": score})
