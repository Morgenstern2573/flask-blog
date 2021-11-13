import psycopg2
import psycopg2.extras
import os


def get_db():
    DATABASE_URL = os.environ['DATABASE_URL']
    if os.environ.get("FLASK_ENV") != "development":
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    else:
        conn = psycopg2.connect(DATABASE_URL)
    return conn.cursor(cursor_factory=psycopg2.extras.DictCursor)


def close_db(cursor):
    conn = cursor.connection
    cursor.close()
    conn.close()
