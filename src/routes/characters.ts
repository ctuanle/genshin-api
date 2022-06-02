import { Router } from 'express';
import {
  getCharacters,
  getCharacterByID,
  searchCharacters,
  getMostRecentlyReleasedCharacters,
} from '../controllers/characters';

const charsRouter = Router();

// query: ?page, ?name, ...
charsRouter.get('/search', searchCharacters);

// recently released
charsRouter.get('/recent', getMostRecentlyReleasedCharacters);

charsRouter.get('/:id', getCharacterByID);

// query: ?page= (default 1)
charsRouter.get('/', getCharacters);

export default charsRouter;
