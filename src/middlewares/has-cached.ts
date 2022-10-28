import { Request, Response, NextFunction } from 'express';
import { lruCache } from '../services/lru-cache';

export const hasCached = (req: Request, res: Response, next: NextFunction) => {
  if (lruCache) {
    if (lruCache.has(req.originalUrl)) {
      console.info('\x1b[32m%s\x1b[0m', 'GET [cached]', req.originalUrl);
      return res.status(200).json(lruCache.get(req.originalUrl));
    }
  }
  console.info('\x1b[32m%s\x1b[0m', 'GET', req.originalUrl);
  next();
};
