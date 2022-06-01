import { Router } from 'express';
import { getCharacters, getCharacterByID } from '../controllers/characters';

const charsRouter = Router();

charsRouter.get('/:id', getCharacterByID);

// query: ?page= (default 1)
charsRouter.get('/', getCharacters);

export default charsRouter;
