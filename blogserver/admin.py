import os.path
import glob
import json
import traceback

from flask import Blueprint, render_template, request
from flask import url_for, make_response, redirect

from . import db

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
        categories = []
        cursor = db.get_db()
        # get list of all categories in database
        cursor.execute('SELECT * FROM CATEGORIES')
        c = cursor.fetchall()
        for row in c:
            categories.append((row["id"], row["title"]))
        if request.args.get("edit") == "true":
            try:
                post_id = request.args.get("id")
                if not post_id:
                    return {"status": "fail", "message": "no post specified"}
                prev["id"] = post_id
                cursor.execute("SELECT * FROM POSTS WHERE id = %s", (post_id,))
                post = cursor.fetchone()
                if not post:
                    return {"status": "fail", "message": "post not found"}

                prev["title"] = post["title"]
                prev["content"] = post["body"]
                cursor.execute(
                    "SELECT * FROM post_category WHERE post_id = %s", (post_id,))
                c = cursor.fetchall()
                post_cats = []
                for row in c:
                    cursor.execute(
                        "SELECT * FROM categories where id = %s", (row["category_id"],))
                    d = cursor.fetchone()
                    post_cats.append([d["id"], d["title"]])
                prev["cat"] = json.dumps(post_cats)
            except Exception:
                traceback.print_exc()
                return json.dumps({"status": "fail", "message": "Internal Server Error"})
            finally:
                db.close_db(cursor)

        return render_template('admin-post.html', prev=prev, categories=categories)
    else:
        error_msg = ""
        cursor = db.get_db()
        post_title = request.form.get("title")
        post_body = request.form.get("body")
        categories = request.form.get("categories")
        edit = request.form.get("edit")
        post_id = request.form.get("id")

        # validation
        if not post_title:
            error_msg = "No post Title"
        elif not post_body:
            error_msg = "Post has no content"
        if len(error_msg) != 0:
            return {"status": "fail", "message": error_msg}

        # lazy way to filter out duplicate categories
        if len(categories) > 0:
            categories = set(categories.split(","))
            categories = [int(x) for x in categories]
        else:
            categories = []

        if edit == "true":
            try:
                if not post_id:
                    return {"status": "fail", "message": "No post specified"}

                cursor.execute("SELECT * FROM posts WHERE id = %s", (post_id,))
                if not cursor.fetchone():
                    return {"status": "fail", "message": "No specified post does not exist"}

                cursor.execute(
                    "UPDATE posts SET title = %s, body = %s WHERE id = %s", (post_title, post_body, post_id))

                cursor.execute(
                    "DELETE FROM post_category WHERE post_id = %s", (post_id,))
                # throwaway variable
                # d = cursor.fetchall()
                # existing_categories = []
                # for row in d:
                #     existing_categories.append(row["category_id"])
                # print(categories)
                # categories = [
                #     x for x in categories if x not in existing_categories]
                # print(categories, existing_categories)
                for x in categories:
                    cursor.execute(
                        "INSERT INTO post_category (post_id, category_id) VALUES (%s, %s)", (post_id, x))
                cursor.connection.commit()

            except Exception:
                traceback.print_exc()
                return json.dumps({"status": "fail", "message": "Internal Server Error"})
            finally:
                db.close_db(cursor)
        else:
            try:
                cursor.execute(
                    "SELECT * FROM posts WHERE title = %s", (post_title,))
                if cursor.fetchone():
                    error_msg = "Post with that tile already exists!"
                    return {"status": "fail", "message": error_msg}

                # insert title and body into posts
                cursor.execute(
                    "INSERT INTO posts (title, body) VALUES (%s, %s)", (post_title, post_body))
                cursor.execute(
                    "SELECT * FROM posts WHERE title = %s", (post_title,))
                post_id = (cursor.fetchone())['id']
                # insert article ids and categories into art_cat
                for a in categories:
                    a = int(a)
                    cursor.execute(
                        "INSERT INTO post_category VALUES(%s, %s)", (post_id, a))
                cursor.connection.commit()
            except Exception:
                traceback.print_exc()
                return json.dumps({"status": "fail", "message": "Internal Server Error"})
            finally:
                db.close_db(cursor)

        return json.dumps({"status": "ok"})


# @bp.route("/edit-post", methods=("GET", "POST"))
# def edit():
#     if request.method == "GET":
#         return render_template('edit-post.html')
#     else:
#         title = request.form.get("title")
#         body = request.form.get("body")
#         categories = request.form.get("categories")
#         return json.dumps({"t": title, "b": body, "c": categories})
