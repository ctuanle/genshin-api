import express, { Application } from 'express';
import { getWelcomeData } from './controllers/root';
import { setHeaderMiddleWare } from './middlewares/set-header';
import { hasCached } from './middlewares/has-cached';
import charsRouter from './routes/characters';
import voiceRouter from './routes/characterVoices';
import bannerRouter from './routes/banners';

const app: Application = express();

app.use(setHeaderMiddleWare);
app.use(hasCached);

app.use('/characters', charsRouter);

app.use('/voices', voiceRouter);

app.use('/banners', bannerRouter);

app.get('/', getWelcomeData);

export default app;
