import os
import os.path
import glob
import json

from flask import Blueprint, render_template, request
from flask import url_for, make_response

bp = Blueprint("auth", __name__)


@bp.route("/", methods=("GET",))
def index():
    # parent_dir, t = os.path.split(os.getcwd())
    # print(parent_dir, os.getcwd())
    # articles_pattern = os.path.join(os.getcwd(), 'articles/*.json')
    # articles = glob.glob(articles_pattern)
    # articles.sort(key=os.path.getmtime, reverse=True)
    # articles = articles[:11]
    # print(articles)
    src = os.path.join(os.getcwd(), 'articles/index.json')
    article_data = []
    with open(src) as src_data:
        article_data = json.load(src_data)
    return render_template('index.html', articles=article_data)


@bp.route("/post", methods=("GET",))
def post():
    if request.method == "GET":
        ind = request.args.get("id")
        if not ind:
            return make_response('URL param missing', 401)
        ind = int(ind)
        articles_pattern = os.path.join(os.getcwd(), 'articles/*.json')
        articles = glob.glob(articles_pattern)[1:]
        article_path = articles[ind]
        article = ''
        with open(article_path) as f:
            article = json.load(f)
        return render_template('post.html', article=article)


@bp.route("/admin", methods=("GET", "POST"))
def admin():
    if request.method == "GET":
        return render_template('admin.html')
