-- products table schema
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image_url VARCHAR(512),
  price NUMERIC(10, 2) NOT NULL,
  duration INTEGER
);
-- user table schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
-- Add a check constraint to allow only one row
ALTER TABLE users ADD CONSTRAINT single_user CHECK ((SELECT COUNT(*) FROM users) <= 1);