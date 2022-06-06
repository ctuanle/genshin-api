import express, { Application, Request, Response } from 'express';
import { getWelcomeData } from './controllers/root';
import { setHeaderMiddleWare } from './middlewares/set-header';
import charsRouter from './routes/characters';
import voiceRouter from './routes/characterVoices';

const app: Application = express();

app.use('/characters', setHeaderMiddleWare, charsRouter);

app.use('/voices', setHeaderMiddleWare, voiceRouter);

app.get('/', setHeaderMiddleWare, getWelcomeData);

export default app;
