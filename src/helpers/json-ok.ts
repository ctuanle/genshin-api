import { Response } from 'express';
import { lruCache } from '../services/lru-cache';

export default function sendJsonOk(_res: Response, _url: string, data: unknown) {
  if (lruCache) {
    lruCache.set(_url, data);
  }
  _res.status(200).json(data);
}
