import express, { Application, Request, Response } from 'express';
import charsRouter from './routes/characters';
import voiceRouter from './routes/voice';

const app: Application = express();

app.use('/characters', charsRouter);

app.use('/voices', voiceRouter);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to our world, fellow traveler!',
  });
});
export default app;
