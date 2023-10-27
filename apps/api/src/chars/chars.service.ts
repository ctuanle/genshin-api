import { Injectable, NotFoundException } from '@nestjs/common';

import { DBService } from '../db/db.service';
import { CharSimple } from './dtos/get-chars.dto';

@Injectable()
export class CharsService {
  constructor(private readonly db: DBService) {}

  async getAllChar(page = 1, limit = 10) {
    const query = `
      SELECT c.id, c.name, c.quality as rarity, wt.code as weapon, visions.code as vision
      FROM characters c
      INNER JOIN weapon_types wt ON wt.id = c.weapon_id
      INNER JOIN visions ON visions.id = c.vision_id
      ORDER BY c.release_date ASC, c.id ASC
      LIMIT $1 OFFSET $2
    `;

    const result = await this.db.query<CharSimple>(null, query, [
      limit,
      limit * (page - 1),
    ]);
    return {
      characters: result.rows,
      meta: { page, limit, order_by: ['release_date', 'id'] },
    };
  }

  async getCharInfoById(id: number, lang = 'en') {
    const query = `
      SELECT 
        c.id, c.code, c.name, concat(c.quality, ' stars') as quality, 
        c.date_of_birth, c.month_of_birth, 
        c.release_date,
        cit.title, cit.constellation,
        json_build_object('code', wt.code , 'translation', wtt.translation) as weapon,
        json_build_object('code', visions.code , 'translation', vt.translation) as vision,
        json_build_object('code', cmt.code , 'translation', cmtt.translation) as model_type,
        array_agg(regions.code) as regions,
        (CASE WHEN cit.affiliations IS NULL THEN array[]::text[] ELSE cit.affiliations END) as affiliations,
        cw.link as wikilink
      FROM characters c
      INNER JOIN weapon_types wt ON wt.id = c.weapon_id AND c.id = $2
      INNER JOIN weapon_types_translations wtt ON wtt.weapon_type_id = c.weapon_id AND wtt.lang = $1
      INNER JOIN visions ON visions.id = c.vision_id
      INNER JOIN visions_translations vt ON vt.vision_id = c.vision_id AND vt.lang = $1
      INNER JOIN char_model_types cmt ON cmt.id = c.model_type_id
      INNER JOIN char_model_types_translations cmtt ON cmtt.model_type_id = c.model_type_id AND cmtt.lang = $1
      INNER JOIN characters_regions cr ON c.id = cr.char_id
      INNER JOIN regions ON regions.id = cr.region_id
      LEFT JOIN characterinfo_translations cit ON cit.char_id = c.id AND cit.lang = $1
      INNER JOIN char_wikilinks cw ON c.code = cw.code
      GROUP BY c.id, wt.code, wtt.translation, visions.code, vt.translation, cmt.code, cmtt.translation, cit.title, cit.constellation, cit.affiliations, cw.link
    `;
    const result = await this.db.query(null, query, [lang, id]);

    if (result.rows.length === 0) throw new NotFoundException();
    return { character: result.rows[0] };
  }
}
