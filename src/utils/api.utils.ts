import httpStatus from 'http-status';
import { Response } from 'express';

interface APIResponseType {
  res: Response;
  data?: any;
}

export const APIResponse = ({ res, data = null }: APIResponseType) => {
  return res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    data,
  });
};

interface APIErrorType {
  res: Response;
  status: number;
  message: string;
  error?: any;
}

export const APIError = ({ res, status, message, error = null }: APIErrorType) => {
  if (error) console.error(error);
  return res.status(httpStatus.OK).json({ status, message });
};
