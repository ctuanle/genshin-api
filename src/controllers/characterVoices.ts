import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import CharacterVoiceModel from '../models/CharacterVoice';

export const getVoices = async (req: Request, res: Response) => {
  try {
    const title = req.query.title as string;
    let filter: { [key: string]: any } = {};
    if (title && title.length !== 0) filter.title = new RegExp(title, 'i');

    const total_results = await CharacterVoiceModel.count(filter);
    const total_pages = Math.ceil(total_results / 20);

    let page = Number(req.query.page);
    if (!page || page < 1) page = 1;

    const projection = { _id: 0, __v: 0 };

    const voices = await CharacterVoiceModel.find(filter, projection)
      .skip(20 * (page - 1))
      .limit(20)
      .populate('spoken_by', { _id: 0, id: 1, name: 1 });

    return res.status(200).json({
      page: page,
      results: voices,
      total_results: total_results,
      total_pages: total_pages,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: {
        message: `Error while getting resources: ${error.message}`,
      },
    });
  }
};

export const getVoicesByChar = async (req: Request, res: Response) => {
  try {
    const charId = Number(req.params.id);
    if (!charId || charId < 1) throw new Error('Unknown character id');

    const char = (await CharacterModel.find({ id: charId }))[0];

    const voices = await CharacterVoiceModel.find(
      { spoken_by: char._id },
      { _id: 0, __v: 0 },
    ).populate('spoken_by', { _id: 0, id: 1, name: 1 });
    if (voices.length === 0) throw new Error('Currently there is no voice of this character');

    return res.status(200).json({
      results: voices,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources: ${error.message}`,
      },
    });
  }
};
