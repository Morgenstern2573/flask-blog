from . import db
import os
import os.path
import glob
import json
import traceback

from flask import Blueprint, render_template, request
from flask import url_for, make_response

bp = Blueprint("auth", __name__)


@bp.route("/", methods=("GET",))
def index():
    # src = os.path.join(os.getcwd(), 'articles/index.json')
    # with open(src) as src_data:
    #     article_data = json.load(src_data)
    cursor = db.get_db()
    cursor.execute(
        "SELECT id, title, created_on FROM posts ORDER BY created_on ASC LIMIT 10")
    article_data = []
    c = cursor.fetchall()
    try:
        for row in c:
            d = {}
            d["id"] = row["id"]
            d["title"] = row["title"]
            d["date"] = str(row["created_on"].year) + "|" + \
                str(row["created_on"].month) + "|" + str(row["created_on"].day)
            d["author"] = "Paul Akinyemi"
            cursor.execute(
                "SELECT category_id, title FROM post_category JOIN categories ON category_id = id WHERE post_id = %s", (row["id"],))
            e = cursor.fetchall()
            d["categories"] = []
            for row in e:
                d["categories"].append(dict(row))
            article_data.append(d)
        db.close_db(cursor)
    except Exception:
        traceback.print_exc()
        return("Internal Server Error")
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
