import { Response } from 'express';
import { lruCache } from '../services/lru-cache';

/**
 * code 404: not found
 * code 500: server error
 */
type StatusCode = 400 | 404 | 500;

export class ErrorWrapper {
  code: StatusCode;

  message: string;

  constructor(code: StatusCode, message: string) {
    this.code = code;
    this.message = message;
  }
}

export const sendError = (error: ErrorWrapper | any, res: Response) => {
  if (error instanceof ErrorWrapper) {
    return res.status(error.code).json({
      error,
    });
  }
  return res.status(500).json({
    error: {
      code: 500,
      message: error.message
        ? error.message
        : 'Server error while getting resources for this request.',
    },
  });
};

export function sendJsonOk(_res: Response, _url: string, data: unknown) {
  if (lruCache) {
    lruCache.set(_url, data);
  }
  _res.status(200).json(data);
}
