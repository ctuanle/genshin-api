/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import CharacterMediaModel, { ICharacterMedia } from '../models/CharacterMedia';
import sendError, { ErrorWrapper } from '../helpers/send-error';

export const getCharacterMedia = async (req: Request, res: Response) => {
  try {
    const charId = Number(req.params.id);
    if (!charId || charId < 1) throw new ErrorWrapper(404, 'Unknown character id.');

    const char = await CharacterModel.findOne({ id: charId }, { id: 1 });
    if (!char) throw new ErrorWrapper(404, 'Unknown character id.');

    const media = await CharacterMediaModel.findOne(
      { character: char._id },
      { _id: 0, __v: 0 }
    ).populate('character', {
      _id: 0,
      id: 1,
      name: 1,
    });

    return res.status(200).json({
      result: media,
    });
  } catch (error: any) {
    return sendError(error, res);
  }
};

export const postAddMedia = async (req: Request, res: Response) => {
  try {
    const charId = Number(req.params.id);
    const char = await CharacterModel.findOne({ id: charId });

    if (!char) throw new ErrorWrapper(400, 'Unknown character ID!');

    const { videos, cameos, artwork, birthday, promotion, holiday } = req.body;

    const media = new CharacterMediaModel<ICharacterMedia>({
      videos,
      cameos,
      artwork,
      birthday,
      promotion,
      holiday,
      character: char._id,
    });

    await media.save();

    return res.status(201).json({
      media: `/characters/${charId}/media`,
      message: 'Media added successfully!',
    });
  } catch (error) {
    return sendError(error, res);
  }
};
