class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.sqlite'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAPBOX_TOKEN = "mapbox_token"


class DockerConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:mysql_root_pass@db:3306/flask_db'
