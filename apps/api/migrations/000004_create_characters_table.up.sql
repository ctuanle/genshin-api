BEGIN;

CREATE TABLE IF NOT EXISTS characters (
  id smallserial PRIMARY KEY,
  code varchar(256) UNIQUE NOT NULL,
  name varchar(256) UNIQUE NOT NULL,
  quality smallint REFERENCES qualities(code),
  weapon_id smallint REFERENCES weapon_types(id),
  vision_id smallint REFERENCES visions(id),
  model_type_id smallint REFERENCES char_model_types(id),
  date_of_birth smallint NOT NULL,
  month_of_birth smallint NOT NULL,
  -- region_id smallint NOT NULL,
  release_date date NOT NULL,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS characters_regions (
  char_id smallint REFERENCES characters(id) ON DELETE CASCADE,
  region_id smallint REFERENCES regions(id) ON DELETE CASCADE
);

CREATE TRIGGER update_characters_modtime BEFORE UPDATE ON characters FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();

COMMIT;