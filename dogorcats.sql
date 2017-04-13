DROP DATABASE IF EXISTS catsordogs;
CREATE DATABASE catsordogs;

\c catsordogs;

CREATE TABLE cd (
  name VARCHAR PRIMARY KEY,
  color VARCHAR,
  catsdogs VARCHAR
);

INSERT INTO cd (name, color, catsdogs)
  VALUES ('Tyler', 'Blue', 'cats');
