BEGIN;

---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS weapon_types_translations (
  lang char(2),
  weapon_type_id smallint,
  translation text,
  UNIQUE(lang, weapon_type_id)
);

INSERT INTO weapon_types_translations (lang, weapon_type_id, translation)
SELECT 'en', id, code
FROM weapon_types;

PREPARE insert_weapon_types_translations (char(2), text, text)
AS INSERT INTO weapon_types_translations (lang, weapon_type_id, translation)
SELECT $1, wt.id, $3 FROM weapon_types wt WHERE wt.code = $2;

EXECUTE insert_weapon_types_translations ('vn', 'sword', 'kiếm đơn');
EXECUTE insert_weapon_types_translations ('fr', 'sword', 'épée à une main');
EXECUTE insert_weapon_types_translations ('vn', 'polearm', 'vũ khí cán dài');
EXECUTE insert_weapon_types_translations ('fr', 'polearm', 'arme d''hast');
EXECUTE insert_weapon_types_translations ('vn', 'bow', 'cung');
EXECUTE insert_weapon_types_translations ('fr', 'bow', 'arc');
EXECUTE insert_weapon_types_translations ('vn', 'catalyst', 'pháp khí');
EXECUTE insert_weapon_types_translations ('fr', 'catalyst', 'catalyseur');
EXECUTE insert_weapon_types_translations ('vn', 'claymore', 'trọng kiếm');
EXECUTE insert_weapon_types_translations ('fr', 'claymore', 'épée à deux main');

---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS visions_translations (
  lang char(2),
  vision_id smallint,
  translation text,
  UNIQUE(lang, vision_id)
);

INSERT INTO visions_translations (lang, vision_id, translation)
SELECT 'en', id, code
FROM visions;

PREPARE insert_visions_translations (char(2), text, text)
AS INSERT INTO visions_translations (lang, vision_id, translation)
SELECT $1, v.id, $3 FROM visions v WHERE v.code = $2;

EXECUTE insert_visions_translations ('vn', 'anemo', 'phong');
EXECUTE insert_visions_translations ('fr', 'anemo', 'anémo');
EXECUTE insert_visions_translations ('vn', 'cryo', 'băng');
EXECUTE insert_visions_translations ('fr', 'cryo', 'cryo');
EXECUTE insert_visions_translations ('vn', 'dendro', 'thảo');
EXECUTE insert_visions_translations ('fr', 'dendro', 'dendro');
EXECUTE insert_visions_translations ('vn', 'electro', 'lôi');
EXECUTE insert_visions_translations ('fr', 'electro', 'électro');
EXECUTE insert_visions_translations ('vn', 'geo', 'nham');
EXECUTE insert_visions_translations ('fr', 'geo', 'géo');
EXECUTE insert_visions_translations ('vn', 'hydro', 'thủy');
EXECUTE insert_visions_translations ('fr', 'hydro', 'hydro');
EXECUTE insert_visions_translations ('vn', 'pyro', 'hỏa');
EXECUTE insert_visions_translations ('fr', 'pyro', 'pyro');

---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS char_model_types_translations (
  lang char(2),
  model_type_id smallint,
  translation text,
  UNIQUE(lang, model_type_id)
);

PREPARE insert_char_model_types_translations (char(2), text, text)
AS INSERT INTO char_model_types_translations (lang, model_type_id, translation)
SELECT $1, m.id, $3 FROM char_model_types m WHERE m.code = $2;

EXECUTE insert_char_model_types_translations ('en', 'tall_male', 'tall male');
EXECUTE insert_char_model_types_translations ('vn', 'tall_male', 'nam trưởng thành');
EXECUTE insert_char_model_types_translations ('fr', 'tall_male', 'grand homme');

EXECUTE insert_char_model_types_translations ('en', 'tall_female', 'tall female');
EXECUTE insert_char_model_types_translations ('vn', 'tall_female', 'nữ trưởng thành');
EXECUTE insert_char_model_types_translations ('fr', 'tall_female', 'grande femme');

EXECUTE insert_char_model_types_translations ('en', 'medium_male', 'medium male');
EXECUTE insert_char_model_types_translations ('vn', 'medium_male', 'nam thành niên');
EXECUTE insert_char_model_types_translations ('fr', 'medium_male', 'homme moyen');

EXECUTE insert_char_model_types_translations ('en', 'medium_female', 'medium female');
EXECUTE insert_char_model_types_translations ('vn', 'medium_female', 'nữ thành niên');
EXECUTE insert_char_model_types_translations ('fr', 'medium_female', 'femme moyen');

EXECUTE insert_char_model_types_translations ('en', 'short_female', 'short female');
EXECUTE insert_char_model_types_translations ('vn', 'short_female', 'nữ thiếu niên');
EXECUTE insert_char_model_types_translations ('fr', 'short_female', 'petite fille');

COMMIT;