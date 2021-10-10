from flask import Blueprint, render_template

bp = Blueprint(__name__)


@bp.route("/", methods=("GET",))
def index():
    return render_template('index.html')


@bp.route("/post", methods=("GET",))
def index():
    return render_template('post.html')
