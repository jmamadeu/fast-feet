-- SQLite
CREATE TABLE tb_users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_password TEXT NOT NULL
)

CREATE TABLE tb_recipients (
  rec_id INTEGER PRIMARY KEY,
  rec_name TEXT NOT NULL,
  rec_city TEXT NOT NULL,
  rec_address TEXT NOT NULL,
  rec_phone TEXT NOT NULL,
  rec_identifiyer TEXT NOT NULL
)

CREATE TABLE tb_delivery_guys (
  del_id TEXT NOT NULL PRIMARY KEY,
  del_name TEXT NOT NULL,
  del_avatar_id TEXT NULL,
  del_email TEXT NOT NULL,
  del_created_at TEXT NULL,
  del_updated_at TEXT NULL
)
INSERT INTO tb_users (user_name, user_email, user_password) VALUES( 'João Amadeu', 'jmamadeu@gmail.com' ,'$2a$08$nWECOs2BtLPwFST6GHTBbOuav1pIzOIGTZ4m1N2b6OUXLXgts3qpq')
