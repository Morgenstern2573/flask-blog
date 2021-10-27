import os.path
import glob
import json

from flask import Blueprint, render_template, request
from flask import url_for, make_response, redirect

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/", methods=("GET",))
def index():
    return redirect('/admin/dashboard')


@bp.route("/dashboard", methods=("GET", "POST"))
def dash():
    return "A list of posts"


@bp.route("/post", methods=("GET", "POST"))
def new():
    if request.method == "GET":
        prev = {}
        if request.args.get("edit"):
            prev["id"] = request.args.get("id")
            # prev["title"] = request.args.get("title")
            # prev["content"] = request.args.get("content")
            prev["title"] = "Test Title"
            prev["content"] = """<p>I</p>
                              <p>AM</p>
                              <p>TESTING</p>
                              <p>THE</p>
                              <p>EDITING</p>
                          """
            prev["cat"] = "shoes, bags,   , boo"

        return render_template('admin-post.html', prev=prev)
    else:
        title = request.form.get("title")
        body = request.form.get("body")
        categories = request.form.get("categories")
        return json.dumps({"t": title, "b": body, "c": categories})


# @bp.route("/edit-post", methods=("GET", "POST"))
# def edit():
#     if request.method == "GET":
#         return render_template('edit-post.html')
#     else:
#         title = request.form.get("title")
#         body = request.form.get("body")
#         categories = request.form.get("categories")
#         return json.dumps({"t": title, "b": body, "c": categories})
