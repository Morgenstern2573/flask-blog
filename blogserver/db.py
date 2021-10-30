import psycopg2
import psycopg2.extras


def get_db():
    conn = psycopg2.connect(
        "host=localhost port=5432 dbname=blog_cms user=postgres password=maitnriot")
    return conn.cursor(cursor_factory=psycopg2.extras.DictCursor)


def close_db(cursor):
    conn = cursor.connection
    cursor.close()
    conn.close()
