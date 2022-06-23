import { Request, Response, NextFunction } from 'express';

export default function keyChecker(req: Request, res: Response, next: NextFunction) {
  // for now let just check if provided key is equal to secret key on server
  /*global process*/
  if (req.query.key && req.query.key === process.env.KEY) {
    return next();
  }
  return res.status(401).json({
    error: {
      code: 401,
      message: 'Unauthorized request!',
    },
  });
}
