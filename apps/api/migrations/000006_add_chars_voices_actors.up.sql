CREATE TABLE IF NOT EXISTS char_voice_actors (
  char_id smallint REFERENCES characters(id),
  language text NOT NULL,
  name text NOT NULL,
  reference text,
  UNIQUE(char_id, language, name)
);