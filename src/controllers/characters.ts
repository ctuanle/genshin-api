import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import { ICharacter } from '../models/Character.interface';

export const getCharacters = async (req: Request, res: Response) => {
  try {
    // default page = 1, 10 records each page
    const totalResults = await CharacterModel.count();
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const chars: ICharacter[] = await CharacterModel.find(
      {},
      { _id: 0, id: 1, name: 1, rarity: 1, weapon: 1, vision: 1, wiki_url: 1 },
    )
      .skip(10 * (page - 1))
      .limit(10);

    return res.status(200).json({
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources for route /characters: ${error.message}`,
      },
    });
  }
};

export const getCharacterByID = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new Error('Unknown id');

    const char = (await CharacterModel.find({ id: id }, { _id: 0, __v: 0 }))[0];
    if (!char) throw new Error('Unknown id');

    return res.status(200).json({
      result: char,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources for route /characters/${req.params.id}: ${error.message}`,
      },
    });
  }
};

export const searchCharacters = async (req: Request, res: Response) => {
  try {
    const { name, rarity, weapon, vision, model_type, region } = req.query;

    const filter: { [key: string]: any } = {};
    const projection: { [key: string]: any } = {
      _id: 0,
      id: 1,
      name: 1,
      rarity: 1,
      weapon: 1,
      vision: 1,
      wiki_url: 1,
    };

    if (name) filter.name = name;
    if (rarity) filter.rarity = rarity;
    if (weapon) filter.weapon = weapon;
    if (vision) filter.vision = vision;
    if (model_type) {
      filter.model_type = model_type;
      projection.model_type = 1;
    }
    if (region) {
      filter.region = [region];
      projection.region = 1;
    }

    if (Object.keys(filter).length === 0) return getCharacters(req, res);

    const totalResults = await CharacterModel.count({ ...filter });
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const chars = await CharacterModel.find(filter, projection)
      .skip(10 * (page - 1))
      .limit(10);

    if (chars.length === 0) throw new Error('No characters matched the query!');

    return res.status(200).json({
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
      supported_attributes: 'name, rarity, weapon, vision, model_type, region',
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources for route /characters/search: ${error.message}`,
      },
    });
  }
};

export const getMostRecentlyReleasedCharacters = async (req: Request, res: Response) => {
  try {
    const projection: { [key: string]: any } = {
      _id: 0,
      id: 1,
      name: 1,
      rarity: 1,
      weapon: 1,
      vision: 1,
      release_version: 1,
      wiki_url: 1,
    };
    const chars = await CharacterModel.find({}, projection).sort({ release_day: -1 }).limit(3);

    return res.status(200).json({
      results: chars,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources for route /characters/${req.params.id}: ${error.message}`,
      },
    });
  }
};
