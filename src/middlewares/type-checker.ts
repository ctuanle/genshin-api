import { Request, Response, NextFunction } from 'express';

import sendError, { ErrorWrapper } from '../helpers/send-error';

function bannerChecker(body: any, res: Response, next: NextFunction) {
  if (!body.name) {
    return sendError(new ErrorWrapper(400, 'Banner name is required!'), res);
  }
  if (!body.type) {
    return sendError(new ErrorWrapper(400, 'Banner type is required!'), res);
  }
  if (!['Character', 'Weapon', 'Permanent'].includes(body.type)) {
    return sendError(new ErrorWrapper(400, 'Unknown banner type!'), res);
  }
  if (!body.version) {
    return sendError(new ErrorWrapper(400, 'Version is required!'), res);
  }
  if (!['v2.7', 'upcoming'].includes(body.version)) {
    return sendError(new ErrorWrapper(400, 'Unknown version!'), res);
  }
  if (!body.featured || body.featured.length !== 3) {
    return sendError(new ErrorWrapper(400, '3 Featured characters are required!'), res);
  }
  body.featured.forEach((id: any) => {
    if (!Number(id) || Number(id) < 1) {
      return sendError(new ErrorWrapper(400, 'Invalid featured character id!'), res);
    }
  });
  if (!body.start) {
    return sendError(new ErrorWrapper(400, 'Start date is required!'), res);
  }
  if (!Date.parse(body.start)) {
    return sendError(new ErrorWrapper(400, 'Invalid start date format!'), res);
  }
  if (body.end && !Date.parse(body.end)) {
    return sendError(new ErrorWrapper(400, 'Invalid end date format!'), res);
  }
  console.log(body);
  next();
}

export default function typeChecker(req: Request, res: Response, next: NextFunction) {
  switch (req.originalUrl) {
    case '/banners': {
      bannerChecker(req.body, res, next);
      break;
    }
    case '/characters': {
      return next();
    }
    default: {
      return sendError(new ErrorWrapper(400, 'Bad request!'), res);
    }
  }
}
