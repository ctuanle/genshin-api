import { Router } from 'express';
import { getVoices } from '../controllers/characterVoices';

const voiceRouter = Router();

// query: ?page: number, title: string
voiceRouter.get('/', getVoices);

export default voiceRouter;
