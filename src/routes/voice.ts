import { Router } from 'express';
import { getVoices } from '../controllers/voices';

const voiceRouter = Router();

voiceRouter.get('/', getVoices);

export default voiceRouter;
