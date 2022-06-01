import e, { Request, Response } from 'express';
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
