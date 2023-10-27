import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

import { DBService } from '../db/db.service';

@Injectable()
export class CronService {
  private readonly origin = 'https://genshin-impact.fandom.com';

  constructor(private readonly db: DBService) {}

  async getCharLinks() {
    const url = `${this.origin}/wiki/Character/List`;

    const raw = await (await fetch(url)).text();
    const $ = cheerio.load(raw);
    const nodes = $(
      'table.article-table:first-of-type tr td:nth-child(2) a',
    ).toArray();

    const links = nodes.map((el) => `${this.origin}${el.attribs['href']}`);

    const newChars: string[] = [];

    await Promise.all(
      links.map(async (link) => {
        const code = link.split('/').at(-1);
        const fromDb = await this.db.query(
          null,
          'SELECT * FROM char_wikilinks WHERE code = $1',
          [code],
        );
        if (fromDb.rows.length === 0) {
          await this.db.transaction(async (tx) => {
            await tx.query(
              'INSERT INTO char_wikilinks (code, link) VALUES ($1, $2)',
              [code, link],
            );
          });
          newChars.push(link);
        }
      }),
    );

    await Promise.all(newChars.map((link) => this.getCharInfo(link)));

    return {
      discovered: links.length,
      new_chars: newChars,
      new_chars_count: newChars.length,
    };
  }

  async getCharInfo(url: string) {
    try {
      const raw = await (await fetch(url)).text();
      const $ = cheerio.load(raw);

      const code = url.split('/').at(-1);

      if (code === 'Traveler') return;

      const nameNode = $('h2[data-source="name"]');

      const charName = nameNode.text();
      const charTitle = nameNode.next().text();

      const constellation = $(
        'div[data-source="constellation"] div a:first-of-type',
      ).text();

      const quality = $('td[data-source="quality"] img')
        .first()
        .attr()
        ['title'].split(' ')[0];
      const weapon = $('td[data-source="weapon"] a')
        .last()
        .text()
        .toLowerCase();
      const vision = $('td[data-source="element"] a')
        .last()
        .text()
        .toLowerCase();
      const model = $('aside[role="region"] section:nth-of-type(2) tr td > a')
        .text()
        .split(' ')
        .join('_')
        .toLowerCase();

      const birthday = $('div[data-source="birthday"] div a').text();
      const birthDay = new Date(
        birthday.slice(0, birthday.length - 2) + ' 2023',
      );
      const monthOfBirth = birthDay.getMonth() + 1;
      const dateOfBirth = birthDay.getDate();

      const regionNodes = $('div[data-source="region"] div a').toArray();
      const regions = regionNodes.map((el) => el.attribs['title']);

      const affiliationNodes = $(
        'div[data-source="affiliation"] div a',
      ).toArray();

      const affiliations = affiliationNodes.map((el) => el.attribs['title']);

      const releaseDateStr = $('div[data-source="releaseDate"] div')
        .html()
        .split('<br>')[0];

      const releaseDate = new Date(releaseDateStr);

      const charFromDB = await this.db.query(
        null,
        'SELECT * FROM characters WHERE code = $1',
        [code],
      );

      if (charFromDB.rows.length === 0) {
        const query = `
        INSERT INTO characters (code, name, quality, weapon_id, vision_id, model_type_id, date_of_birth, month_of_birth, release_date )
        SELECT $1, $2, $3, weapon_types.id, visions.id, char_model_types.id, $7, $8, $9
        FROM weapon_types, visions, char_model_types
        WHERE weapon_types.code = $4 AND visions.code = $5 AND char_model_types.code = $6
        RETURNING id
      `;

        const args = [
          code,
          charName,
          quality,
          weapon,
          vision,
          model,
          dateOfBirth,
          monthOfBirth,
          releaseDate,
        ];

        await this.db.transaction(async (tx) => {
          const charDB = await tx.query<{ id: number }>(query, args);

          if (charDB.rowCount === 0) throw new Error('insert failed');

          const charId = charDB.rows[0].id;

          const regionQuery = `
            INSERT INTO characters_regions (char_id, region_id)
            SELECT $1, regions.id
            FROM regions
            WHERE regions.code = $2
          `;

          await Promise.all(
            regions.map((r) => tx.query(regionQuery, [charId, r])),
          );

          const transQuery = `
            INSERT INTO characterinfo_translations (char_id, lang, title, constellation, affiliations)
            VALUES ($1, $2, $3, $4, $5);
          `;

          const transArgs = [
            charId,
            'en',
            charTitle,
            constellation,
            affiliations,
          ];

          await tx.query(transQuery, transArgs);
        });
      }

      const data = {
        code,
        charName,
        quality: Number(quality),
        weapon,
        vision,
        model,
        monthOfBirth,
        dateOfBirth,
        regions,
        releaseDate,
        charTitle,
        constellation,
        affiliations,
      };

      return data;
    } catch (error) {
      console.log(url);
      console.log(error);
    }
  }
}
