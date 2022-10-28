/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import ICharacter from '../models/Character.interface';
import { sendJsonOk, sendError, ErrorWrapper } from '../helpers/sender';

const basicProjection: { [key: string]: any } = {
  _id: 0,
  id: 1,
  name: 1,
  rarity: 1,
  weapon: 1,
  vision: 1,
  wiki_url: 1,
};

export const getCharacters = async (req: Request, res: Response) => {
  try {
    // default page = 1, 10 records each page
    const totalResults = await CharacterModel.count();

    const limiter = Number(req.query.limit) || 10;
    const totalPages = Math.ceil(totalResults / limiter);

    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const chars: ICharacter[] = await CharacterModel.find({}, basicProjection)
      .sort({ id: 1 })
      .skip(limiter * (page - 1))
      .limit(limiter);

    return sendJsonOk(res, req.originalUrl, {
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
    });
    //
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const getCharacterByID = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new ErrorWrapper(404, 'Unknown ID');

    const char = await CharacterModel.findOne({ id: id }, { _id: 0, __v: 0 });
    if (!char) throw new ErrorWrapper(404, 'Unknown ID');

    return sendJsonOk(res, req.originalUrl, {
      result: char,
    });
    //
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const searchCharacters = async (req: Request, res: Response) => {
  try {
    const { name, rarity, weapon, vision, model_type: modelType, region } = req.query;

    const filter: { [key: string]: any } = {};
    const projection = { ...basicProjection };

    if (name) filter.name = name;
    if (rarity) filter.rarity = rarity;
    if (weapon) filter.weapon = weapon;
    if (vision) filter.vision = vision;
    if (modelType) {
      filter.model_type = modelType;
      projection.model_type = 1;
    }
    if (region) {
      filter.region = [region];
      projection.region = 1;
    }

    if (Object.keys(filter).length === 0) return await getCharacters(req, res);

    const totalResults = await CharacterModel.count({ ...filter });
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const chars = await CharacterModel.find(filter, projection)
      .skip(10 * (page - 1))
      .limit(10);

    return sendJsonOk(res, req.originalUrl, {
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
      supported_attributes: 'name, rarity, weapon, vision, model_type, region',
    });
    //
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const getMostRecentlyReleasedCharacters = async (req: Request, res: Response) => {
  try {
    const projection = { ...basicProjection };
    projection.release_version = 1;

    const chars = await CharacterModel.find({}, projection).sort({ release_day: -1 }).limit(3);

    return sendJsonOk(res, req.originalUrl, {
      results: chars,
    });
    //
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const postAddCharacter = async (req: Request, res: Response) => {
  try {
    const newId = (await CharacterModel.count()) + 1;

    const {
      name,
      title,
      real_name,
      rarity,
      weapon,
      vision,
      model_type,
      birthday,
      constellation,
      region,
      affiliation,
      special_dish,
      how_to_obtain,
      release_day,
      release_version,
      category,
      voice_actors,
      wiki_url,
    } = req.body;

    const newChar = new CharacterModel<ICharacter>({
      id: newId,
      name,
      title,
      real_name,
      rarity,
      weapon,
      vision,
      model_type,
      birthday,
      constellation,
      region,
      affiliation,
      special_dish,
      how_to_obtain,
      release_day,
      release_version,
      category,
      voice_actors,
      wiki_url,
    });
    // const bodyChar: { [key: string]: any } = {};
    // bodyChar.id = newId;
    // bodyChar.name = req.body.name;
    // if (req.body.title) {
    //   bodyChar.title = req.body.title;
    // }
    // if (req.body.real_name) {
    //   bodyChar.real_name = req.body.real_name;
    // }
    // bodyChar.rarity = req.body.rarity;
    // bodyChar.weapon = req.body.weapon;
    // bodyChar.vision = req.body.vision;
    // bodyChar.model_type = req.body.model_type;
    // bodyChar.birthday = req.body.birthday;
    // bodyChar.constellation = req.body.constellation;
    // bodyChar.region = req.body.region;
    // if (req.body.affiliation) bodyChar.affiliation = req.body.affiliation;
    // if (req.body.special_dish) bodyChar.special_dish = req.body.special_dish;
    // if (req.body.how_to_obtain) bodyChar.how_to_obtain = req.body.how_to_obtain;
    // bodyChar.release_day = new Date(req.body.release_day);
    // bodyChar.release_version = new Date(req.body.release_version);
    // bodyChar.category = req.body.category;
    // bodyChar.voice_actors = req.body.voice_actors;
    // bodyChar.wiki_url = req.body.wiki_url;

    await newChar.save();

    return res.status(201).json({
      id: newChar.id,
      message: 'Character added successfully!',
    });
  } catch (error) {
    return sendError(error, res);
  }
};
