from . import db
import json
import traceback

from flask import Blueprint, render_template, request
from flask import url_for, make_response

bp = Blueprint("auth", __name__)


@bp.route("/", methods=("GET",))
def index():
    cursor = db.get_db()
    cursor.execute(
        "SELECT id, title, created_on FROM posts WHERE published = TRUE ORDER BY created_on ASC LIMIT 10")
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
        article = {}
        cursor = db.get_db()
        try:
            cursor.execute(
                "SELECT title, created_on, body FROM posts WHERE id = %s", (ind,))
            c = cursor.fetchone()
            if not c:
                db.close_db(cursor)
                return "Requested post does not exist"
            article["title"] = c["title"]
            article["date"] = str(c["created_on"].year) + "|" + \
                str(c["created_on"].month) + "|" + str(c["created_on"].day)
            article["author"] = "Paul Akinyemi"
            article["body"] = c["body"]

            # cursor.execute(
            #     "SELECT category_id, title FROM post_category JOIN categories ON category_id = id WHERE id = %s", (ind))
            # e = cursor.fetchall()
            # article["categories"] = []
            # for row in e:
            #     article["categories"].append(dict(row))
            db.close_db(cursor)
        except Exception:
            traceback.print_exc()
            return "Internal Server Error"
        return render_template('post.html', article=article)
