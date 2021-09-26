from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class="app.config.Config"):
    app = Flask(__name__)

    @app.before_first_request
    def create_tables():
        db.create_all()

    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    from .index import index as index_blueprint
    app.register_blueprint(index_blueprint)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app
