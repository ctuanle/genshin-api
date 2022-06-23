/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import CharacterVoiceModel, { ICharacterVoice } from '../models/CharacterVoice';
import sendError, { ErrorWrapper } from '../helpers/send-error';

export const getVoices = async (req: Request, res: Response) => {
  try {
    const title = req.query.title as string;
    const filter: { [key: string]: any } = {};
    if (title && title.length !== 0) filter.title = new RegExp(title, 'i');

    const totalResults = await CharacterVoiceModel.count(filter);
    const totalPages = Math.ceil(totalResults / 20);

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
      total_results: totalResults,
      total_pages: totalPages,
    });
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const getVoicesByChar = async (req: Request, res: Response) => {
  try {
    const charId = Number(req.params.id);
    if (!charId || charId < 1) throw new ErrorWrapper(404, 'Unknown character id.');

    const char = await CharacterModel.findOne({ id: charId }, { id: 1 });
    if (!char) throw new ErrorWrapper(404, 'Unknown character id.');

    const voices = await CharacterVoiceModel.find(
      { spoken_by: char._id },
      { _id: 0, __v: 0 }
    ).populate('spoken_by', { _id: 0, id: 1, name: 1 });

    return res.status(200).json({
      results: voices,
    });
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const postAddVoice = async (req: Request, res: Response) => {
  try {
    const { title, requirement, details, charId } = req.body;
    const char = await CharacterModel.findOne({ id: charId });

    if (!char) {
      return sendError(new ErrorWrapper(400, 'Unknown charater ID'), res);
    }

    const voice = new CharacterVoiceModel<ICharacterVoice>({
      title,
      requirement,
      details,
      spoken_by: char._id,
    });

    await voice.save();

    return res.status(201).json({
      voice: `/characters/${char.id}/voices`,
      message: 'Voice added successfully!',
    });
  } catch (error) {
    return sendError(error, res);
  }
};
