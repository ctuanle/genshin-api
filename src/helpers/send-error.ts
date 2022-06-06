import { Response } from 'express';

/**
 * code 404: not found
 * code 500: server error
 */
type StatusCode = 404 | 500;

export class ErrorWrapper {
  code: StatusCode;
  message: string;

  constructor(code: StatusCode, message: string) {
    this.code = code;
    this.message = message;
  }
}

const sendError = (error: ErrorWrapper | any, res: Response) => {
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

export default sendError;
