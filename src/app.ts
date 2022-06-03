import express, { Application, Request, Response } from 'express';
import { setHeaderMiddleWare } from './middlewares/set-header';
import charsRouter from './routes/characters';
import voiceRouter from './routes/voice';

const app: Application = express();

app.use('/characters', setHeaderMiddleWare, charsRouter);

app.use('/voices', setHeaderMiddleWare, voiceRouter);

app.get('/', setHeaderMiddleWare, (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to our world, fellow traveler!',
  });
});
export default app;
