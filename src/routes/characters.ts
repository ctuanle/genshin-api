import { Router } from 'express';
import {
  getCharacters,
  getCharacterByID,
  searchCharacters,
  getMostRecentlyReleasedCharacters,
} from '../controllers/characters';
import { getVoicesByChar } from '../controllers/voices';

const charsRouter = Router();

// query: ?page, ?name, ...
charsRouter.get('/search', searchCharacters);

// recently released
charsRouter.get('/recent', getMostRecentlyReleasedCharacters);

// voices of char
charsRouter.get('/:id/voices', getVoicesByChar);

charsRouter.get('/:id', getCharacterByID);

// query: ?page= (default 1)
charsRouter.get('/', getCharacters);

export default charsRouter;
