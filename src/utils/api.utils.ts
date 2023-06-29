import httpStatus from 'http-status';
import { Response } from 'express';

type TResponseData = {
  result: any;
  message: string;
}
interface APIResponseType {
  res: Response;
  data?: any;
}
/**
 * Response wrapper for controllers return data.
 * @example 
  return APIResponse({
        res,
        data: {
          result: [],
          message: 'Success',
        },
      });
 */
export const APIResponse = ({ res, data = null }: APIResponseType): { status: number; data: TResponseData } => {
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
/**
 * Response wrapper for controllers return error.
 * @example 
  throw APIError({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
        error: err,
      });
 */
export const APIError = ({ res, status, message, error = null }: APIErrorType): { status: number; message: string } => {
  if (error) console.error(error);
  return res.status(httpStatus.OK).json({ status, message });
};
