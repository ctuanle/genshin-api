BEGIN;

CREATE TABLE IF NOT EXISTS characterinfo_translations (
  char_id smallint REFERENCES characters(id) ON DELETE CASCADE,
  lang char(2) REFERENCES languages(code),
  title text NOT NULL,
  constellation text NOT NULL,
  affiliations text[]
);

COMMIT;