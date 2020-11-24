DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS graph_history;

CREATE TABLE users(
  _id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  pwd text
);

CREATE TABLE graph_history(
  img bytea,
  query text,
  ts TIMESTAMPTZ,
  users_id integer references users(_id)
);


