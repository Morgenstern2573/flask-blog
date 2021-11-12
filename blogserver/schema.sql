DROP TABLE IF EXISTS post_category;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(100) UNIQUE,
  userpassword TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title varchar(200) UNIQUE NOT NULL,
  body TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  title varchar(100) UNIQUE NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_category (
  post_id int references posts(id) ON DELETE CASCADE,
  category_id int references categories(id) ON DELETE CASCADE,
  PRIMARY KEY(post_id, category_id)
);
