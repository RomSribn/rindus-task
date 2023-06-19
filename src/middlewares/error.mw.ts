import httpStatus from 'http-status';
import { APIError } from './../utils/api.utils';
import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  throw APIError({
    res,
    message: 'Resource not found',
    status: httpStatus.NOT_FOUND,
  });
};
