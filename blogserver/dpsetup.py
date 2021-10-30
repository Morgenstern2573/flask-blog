import psycopg2
conn = psycopg2.connect(
    "host=localhost port=5432 dbname=blog_cms user=postgres password=maitnriot")
cur = conn.cursor()
with open('schema.sql', 'r', encoding='utf-8') as f:
    cur.execute(f.read())
    conn.commit()

conn.close()
