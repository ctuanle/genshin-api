import { Request, Response } from 'express';
import sendError from '../helpers/send-error';
import BannerModel from '../models/Banner';
import CharacterModel from '../models/Character';
import CharacterMediaModel from '../models/CharacterMedia';
import CharacterVoiceModel from '../models/CharacterVoice';

export const getWelcomeData = async (req: Request, res: Response) => {
  try {
    const [nbChars, nbMedia, nbVoices, nbBanners] = await Promise.all([
      CharacterModel.count(),
      CharacterMediaModel.count(),
      CharacterVoiceModel.count(),
      BannerModel.count(),
    ]);
    // const nbChars = await CharacterModel.count();
    // const nbMedia = await CharacterMediaModel.count();
    // const nbVoices = await CharacterVoiceModel.count();
    // const nbBanners = await BannerModel.count();

    return res.json({
      message: 'Welcome to our world, fellow traveler!',
      endpoints: {
        root: 'https://gshimpact-api.herokuapp.com/',
        characters: 'https://gshimpact-api.herokuapp.com/characters',
        voices: 'https://gshimpact-api.herokuapp.com/voices',
        banners: 'https://gshimpact-api.herokuapp.com/banners',
      },
      statistics: {
        characters: nbChars,
        media: nbMedia,
        voices: nbVoices,
        banners: nbBanners,
      },
    });
  } catch (error) {
    return sendError(error, res);
  }
};
