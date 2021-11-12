import json
import traceback

from flask import Blueprint, render_template, request
from flask import url_for, make_response, redirect

from . import db

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/", methods=("GET",))
def index():
    return redirect('/admin/dashboard')


@bp.route("/dashboard", methods=("GET",))
def dash():
    cursor = db.get_db()
    posts = []
    search = request.args.get("search")
    error_msg = ""
    try:
        if search:
            key = "%"+search+"%"
            cursor.execute(
                "SELECT * FROM posts WHERE title LIKE %s ESCAPE ''", (key,))
        else:
            cursor.execute("SELECT * FROM posts")

        c = cursor.fetchall()
        for row in c:
            posts.append(dict(row))
    except Exception:
        traceback.print_exc()
        error_msg = "Internal Server Error"
    finally:
        db.close_db(cursor)

    if len(error_msg) != 0:
        return json.dumps({"status": "fail", "message": error_msg})

    return render_template('dashboard.html', posts=posts, search=search)


@bp.route("/post", methods=("GET", "POST"))
def new():
    if request.method == "GET":
        # current data of post to be edited
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
                    db.close_db(cursor)
                    return {"status": "fail", "message": "no post specified"}

                prev["id"] = post_id
                cursor.execute("SELECT * FROM POSTS WHERE id = %s", (post_id,))
                post = cursor.fetchone()
                if not post:
                    db.close_db(cursor)
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
                db.close_db(cursor)
            except Exception:
                traceback.print_exc()
                db.close_db(cursor)
                return json.dumps({"status": "fail", "message": "Internal Server Error"})

        return render_template('admin-post.html', prev=prev, categories=categories)
    else:
        error_msg = ""
        cursor = db.get_db()
        post_title = request.form.get("title")
        post_body = request.form.get("body")
        categories = request.form.get("categories")
        edit = request.form.get("edit")
        post_id = request.form.get("id")
        publish = request.form.get("publish")

        # validation
        if not post_title:
            error_msg = "No post Title"
        elif not post_body:
            error_msg = "Post has no content"
        if len(error_msg) != 0:
            return {"status": "fail", "message": error_msg}

        if not publish or publish == "false":
            publish = False
        else:
            publish = True

        # lazy way to filter out duplicate categories
        if len(categories) > 0:
            categories = set(categories.split(","))
            categories = [int(x) for x in categories]
        else:
            categories = []

        if edit == "true":
            # logic for editing an existing post
            try:
                if not post_id:
                    db.close_db(cursor)
                    return {"status": "fail", "message": "No post specified"}

                cursor.execute("SELECT * FROM posts WHERE id = %s", (post_id,))
                if not cursor.fetchone():
                    db.close_db(cursor)
                    return {"status": "fail", "message": "Specified post does not exist"}

                cursor.execute(
                    "UPDATE posts SET title = %s, body = %s, published = %s WHERE id = %s", (post_title, post_body, publish, post_id))

                cursor.execute(
                    "DELETE FROM post_category WHERE post_id = %s", (post_id,))

                for x in categories:
                    cursor.execute(
                        "INSERT INTO post_category (post_id, category_id) VALUES (%s, %s)", (post_id, x))
                cursor.connection.commit()
                db.close_db(cursor)
            except Exception:
                traceback.print_exc()
                db.close_db(cursor)
                return json.dumps({"status": "fail", "message": "Internal Server Error"})
        else:
            # logic for creating a new post
            try:
                cursor.execute(
                    "SELECT * FROM posts WHERE title = %s", (post_title,))
                if cursor.fetchone():
                    error_msg = "Post with that tile already exists!"
                    db.close_db(cursor)
                    return {"status": "fail", "message": error_msg}

                # insert title and body into posts
                cursor.execute(
                    "INSERT INTO posts (title, body, published) VALUES (%s, %s, %s)", (post_title, post_body, publish))
                cursor.execute(
                    "SELECT * FROM posts WHERE title = %s", (post_title,))
                post_id = (cursor.fetchone())['id']

                # insert article ids and categories into art_cat
                for a in categories:
                    a = int(a)
                    cursor.execute(
                        "INSERT INTO post_category VALUES(%s, %s)", (post_id, a))
                cursor.connection.commit()
                db.close_db(cursor)
            except Exception:
                traceback.print_exc()
                db.close_db(cursor)
                return json.dumps({"status": "fail", "message": "Internal Server Error"})

        return json.dumps({"status": "ok"})


@bp.route("/delete-post", methods=("GET",))
def del_post():
    post_id = request.args.get("id")
    if not post_id:
        return json.dumps({"status": "fail", "message": "no post specified"})

    cursor = db.get_db()
    try:
        cursor.execute("SELECT * FROM posts WHERE id = %s", (post_id,))
        if not cursor.fetchone():
            db.close_db(cursor)
            return json.dumps({"status": "fail", "message": "Specified post not found"})
        cursor.execute("DELETE FROM posts WHERE id = %s", (post_id,))
        cursor.connection.commit()
        db.close_db(cursor)
    except Exception:
        traceback.print_exc()
        db.close_db(cursor)
        return json.dumps({"status": "fail", "message": "Internal Server Error"})
    return json.dumps({"status": "ok"})


@bp.route("/update-post-status", methods=("GET",))
def up_post_status():
    post_id = request.args.get("id")
    new_status = request.args.get("status")

    if not post_id:
        return json.dumps({"status": "fail", "message": "no post specified"})
    elif not new_status:
        return json.dumps({"status": "fail", "message": "no status specified"})

    new_status = True if new_status == "p" else False
    cursor = db.get_db()
    try:
        cursor.execute("SELECT * FROM posts WHERE id = %s", (post_id,))
        if not cursor.fetchone():
            db.close_db(cursor)
            return json.dumps({"status": "fail", "message": "Specified post not found"})

        cursor.execute(
            "UPDATE posts SET published = %s WHERE id = %s", (new_status, post_id))
        cursor.connection.commit()
        db.close_db(cursor)
    except Exception:
        db.close_db(cursor)
        traceback.print_exc()
        return json.dumps({"status": "fail", "message": "Internal Server Error"})
    return json.dumps({"status": "ok"})


@bp.route("/category", methods=("GET", "POST"))
def category():
    if request.method == "GET":
        error_msg = ""
        cursor = db.get_db()
        categories = []
        try:
            cursor.execute("SELECT * FROM categories")
            c = cursor.fetchall()
            for row in c:
                categories.append(dict(row))
        except Exception:
            traceback.print_exc()
            error_msg = "Internal Server Error"
        finally:
            db.close_db(cursor)
        if len(error_msg) != 0:
            return json.dumps({"status": "fail", "message": error_msg})
        return render_template("category.html", categories=categories)
    else:
        error_msg = ""
        cursor = db.get_db()
        category_title = request.form.get("title")
        r_type = request.form.get("type")
        category_id = request.form.get("id")

        # validation
        if not category_title and r_type != "del":
            error_msg = "no category title provided"
        if len(error_msg) != 0:
            db.close_db(cursor)
            return {"status": "fail", "message": error_msg}

        if r_type == "add":
            try:
                cursor.execute(
                    "SELECT * FROM categories WHERE id = %s", (category_id,))
                if cursor.fetchone():
                    db.close_db(cursor)
                    return json.dumps({"status": "fail", "message": "specified category already exists"})

                cursor.execute(
                    "INSERT INTO categories (title) VALUES (%s)", (category_title,))
                cursor.connection.commit()
            except Exception:
                error_msg = "Internal Server Error"
                traceback.print_exc()
            finally:
                db.close_db(cursor)

            if len(error_msg) == 0:
                return json.dumps({"status": "ok"})
            else:
                return json.dumps({"status": "fail", "message": error_msg})

        elif r_type == "edit":
            try:
                if not category_id:
                    db.close_db(cursor)
                    return json.dumps({"status": "fail", "message": "category id missing"})

                cursor.execute(
                    "SELECT * FROM categories WHERE id = %s", (category_id,))
                if not cursor.fetchone():
                    db.close_db(cursor)
                    return json.dumps({"status": "fail", "message": "specified category does not exist"})

                cursor.execute(
                    "UPDATE categories SET title = %s WHERE id = %s", (category_title, category_id))
                cursor.connection.commit()
                db.close_db(cursor)
                return json.dumps({"status": "ok"})
            except Exception:
                traceback.print_exc()
                db.close_db(cursor)
                return json.dumps({"status": "fail", "message": "Internal Server Error"})

        else:
            try:
                if not category_id:
                    db.close_db(cursor)
                    return json.dumps({"status": "fail", "message": "category id missing"})

                cursor.execute(
                    "SELECT * FROM categories WHERE id = %s", (category_id,))
                if not cursor.fetchone():
                    db.close_db(cursor)
                    return json.dumps({"status": "fail", "message": "specified category does not exist"})

                cursor.execute(
                    "DELETE FROM categories WHERE id = %s", (category_id,))
                cursor.connection.commit()
                db.close_db(cursor)
                return json.dumps({"status": "ok"})
            except Exception:
                traceback.print_exc()
                db.close_db(cursor)
                return json.dumps({"status": "fail", "message": "Internal Server Error"})
