from flask import Flask


def create_app():
    app = Flask(__name__)
    from . import blog
    app.register_blueprint(blog.bp)
    return app
