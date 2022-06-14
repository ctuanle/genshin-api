import express, { Application } from 'express';
import { getWelcomeData } from './controllers/root';
import { setHeaderMiddleWare } from './middlewares/set-header';
import charsRouter from './routes/characters';
import voiceRouter from './routes/characterVoices';
import bannerRouter from './routes/banners';

const app: Application = express();

app.use('/characters', setHeaderMiddleWare, charsRouter);

app.use('/voices', setHeaderMiddleWare, voiceRouter);

app.use('/banners', setHeaderMiddleWare, bannerRouter);

app.get('/', setHeaderMiddleWare, getWelcomeData);

export default app;
