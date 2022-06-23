import { json, Router } from 'express';
import { getCharacterMedia, postAddMedia } from '../controllers/characterMedia';
import {
  getCharacters,
  getCharacterByID,
  searchCharacters,
  getMostRecentlyReleasedCharacters,
  postAddCharacter,
} from '../controllers/characters';
import { getVoicesByChar } from '../controllers/characterVoices';
import keyChecker from '../middlewares/check-key';
import typeChecker, { mediaChecker } from '../middlewares/type-checker';

const charsRouter = Router();

// query: ?page, ?name, ...
charsRouter.get('/search', searchCharacters);

// recently released
charsRouter.get('/recent', getMostRecentlyReleasedCharacters);

// voices of char
charsRouter.get('/:id/voices', getVoicesByChar);

// media of char
charsRouter
  .route('/:id/media')
  .get(getCharacterMedia)
  .post(keyChecker, json(), mediaChecker, postAddMedia);

charsRouter.get('/:id', getCharacterByID);

// query: ?page= (default 1)
charsRouter.route('/').get(getCharacters).post(keyChecker, json(), typeChecker, postAddCharacter);

export default charsRouter;
