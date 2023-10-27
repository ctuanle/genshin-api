BEGIN;

CREATE TABLE IF NOT EXISTS char_wikilinks (
  code text PRIMARY KEY,
  link text NOT NULL,
  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
  code char(2) PRIMARY KEY
);

INSERT INTO languages (code) VALUES ('en'), ('fr'), ('vi');

CREATE TABLE IF NOT EXISTS weapon_types (
  id smallserial PRIMARY KEY,
  code varchar(32) UNIQUE NOT NULL
);

INSERT INTO weapon_types (code) VALUES ('sword'), ('polearm'), ('bow'), ('catalyst'), ('claymore');

CREATE TABLE IF NOT EXISTS visions (
  id smallserial PRIMARY KEY,
  code varchar(32) UNIQUE NOT NULL
);

INSERT INTO visions (code) VALUES ('anemo'), ('cryo'), ('electro'), ('dendro'), ('geo'), ('hydro'), ('pyro');

CREATE TABLE IF NOT EXISTS qualities (
  code smallint PRIMARY KEY
);

INSERT INTO qualities (code) VALUES (1), (2), (3), (4), (5);

CREATE TABLE IF NOT EXISTS char_model_types (
  id smallserial PRIMARY KEY,
  code varchar(32) UNIQUE NOT NULL
);

INSERT INTO char_model_types (code) VALUES ('tall_male'), ('tall_female'), ('medium_male'), ('medium_female'), ('short_female');

CREATE TABLE IF NOT EXISTS regions (
  id smallserial PRIMARY KEY,
  code varchar(32) UNIQUE NOT NULL
);

INSERT INTO regions (code) VALUES 
  ('Mondstadt'),
  ('Liyue'),
  ('Inazuma'),
  ('Sumeru'),
  ('Fontaine'),
  ('Natlan'),
  ('Snezhnaya'),
  ('Khaenri''ah'),
  ('Celestia')
;


COMMIT;