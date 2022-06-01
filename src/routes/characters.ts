import { Router } from 'express';
import { getCharacters, getCharacterByID, searchCharacters } from '../controllers/characters';

const charsRouter = Router();

// query: ?page, ?name, ...
charsRouter.get('/search', searchCharacters);

charsRouter.get('/:id', getCharacterByID);

// query: ?page= (default 1)
charsRouter.get('/', getCharacters);

export default charsRouter;
