/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import ICharacter from '../models/Character.interface';
import sendError, { ErrorWrapper } from '../helpers/send-error';

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
    const totalPages = Math.ceil(totalResults / 10);
    let page = Number(req.query.page) || 1;
    if (page < 1 || page > totalPages) page = 1;

    const chars: ICharacter[] = await CharacterModel.find({}, basicProjection)
      .sort({ id: 1 })
      .skip(10 * (page - 1))
      .limit(10);

    return res.status(200).json({
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
    });
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

    return res.status(200).json({
      result: char,
    });
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

    return res.status(200).json({
      page: page,
      results: chars,
      total_results: totalResults,
      total_pages: totalPages,
      supported_attributes: 'name, rarity, weapon, vision, model_type, region',
    });
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const getMostRecentlyReleasedCharacters = async (req: Request, res: Response) => {
  try {
    const projection = { ...basicProjection };
    projection.release_version = 1;

    const chars = await CharacterModel.find({}, projection).sort({ release_day: -1 }).limit(3);

    return res.status(200).json({
      results: chars,
    });
  } catch (error: any) {
    return sendError(error, res);
  }
};
