DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS graph_history;

CREATE TABLE users(
  _id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  pwd text,
);

CREATE TABLE graph_history(
  img bytea,
  query text,
  ts TIMESTAMPTZ,
  CONSTRAINT fk_user
    FOREIGN KEY(_id)
	    REFERENCES users(_id)
);


