import { json, Router } from 'express';
import { getVoices, postAddVoice } from '../controllers/characterVoices';
import keyChecker from '../middlewares/check-key';
import { voiceChecker } from '../middlewares/type-checker';

const voiceRouter = Router();

// query: ?page: number, title: string
voiceRouter.route('/').get(getVoices).post(keyChecker, json(), voiceChecker, postAddVoice);

export default voiceRouter;
