import { Request, Response, NextFunction } from 'express';

export const setHeaderMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', 'GET, OPTIONS');
  return next();
};
