import { Request, Response, NextFunction } from 'express';

export const setHeaderMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
};
