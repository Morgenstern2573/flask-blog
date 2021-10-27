from flask import Flask


def create_app():
    app = Flask(__name__)
    from . import blog, admin
    app.register_blueprint(blog.bp)
    app.register_blueprint(admin.bp)
    return app
