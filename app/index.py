from flask import Blueprint, render_template, request
import json
from . import osmap_utils

index = Blueprint('index', __name__)


@index.route('/')
def index_endpoint():
    return render_template("index.html")
