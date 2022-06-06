import { Request, Response } from 'express';
import sendError from '../helpers/send-error';
import CharacterModel from '../models/Character';
import CharacterMediaModel from '../models/CharacterMedia';
import CharacterVoiceModel from '../models/CharacterVoice';

export const getWelcomeData = async (req: Request, res: Response) => {
  try {
    const nbChars = await CharacterModel.count();
    const nbMedia = await CharacterMediaModel.count();
    const nbVoices = await CharacterVoiceModel.count();

    return res.json({
      message: 'Welcome to our world, fellow traveler!',
      endpoints: {
        root: 'https://gshimpact-api.herokuapp.com/',
        characters: 'https://gshimpact-api.herokuapp.com/characters',
        voices: 'https://gshimpact-api.herokuapp.com/voices',
      },
      statistics: {
        characters: nbChars,
        media: nbMedia,
        voices: nbVoices,
      },
    });
  } catch (error) {
    return sendError(error, res);
  }
};
