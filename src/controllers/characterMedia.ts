import { Request, Response } from 'express';
import CharacterModel from '../models/Character';
import CharacterMediaModel from '../models/CharacterMedia';

export const getCharacterMedia = async (req: Request, res: Response) => {
  try {
    const charId = Number(req.params.id);
    if (!charId || charId < 1) throw new Error('Unknown character id');

    const char = await CharacterModel.findOne({ id: charId }, { id: 1 });
    if (!char) throw new Error('Unknown character id');

    const media = await CharacterMediaModel.findOne(
      { character: char._id },
      { _id: 0, __v: 0 },
    ).populate('character', {
      _id: 0,
      id: 1,
      name: 1,
    });
    if (!media) throw new Error('Currently there is no media for this character.');

    return res.status(200).json({
      result: media,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: {
        message: `Error while getting resources: ${error.message}`,
      },
    });
  }
};
