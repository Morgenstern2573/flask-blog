DROP TABLE IF EXISTS post_category;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(100) UNIQUE,
  userpassword TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title varchar(200) UNIQUE,
  body TEXT
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  title varchar(100) UNIQUE
);

CREATE TABLE post_category (
  post_id int references posts(id),
  category_id int references categories(id),
  PRIMARY KEY(post_id, category_id)
);
