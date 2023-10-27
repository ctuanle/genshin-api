BEGIN;

DROP TRIGGER IF EXISTS update_characters_modtime ON characters;
DROP TABLE IF EXISTS characters_regions;
DROP TABLE IF EXISTS characters;

COMMIT;