import httpStatus from 'http-status';
import { Response } from 'express';
import { City } from '../models/City.model';
import { APIError, APIResponse } from '@utils/api.utils';

class CitiesCtrl {
  /**
   * @description   Get all cities.
   * @route         GET /cities
   * @success       { result: City[], message: string }
   * @memberof CitiesCtrl
   */
  getCities = async (_, res: Response) => {
    try {
      const cities = await City.findAll();
      
      return APIResponse({
        res,
        data: {
          result: cities,
          message: 'Success',
        },
      });
    } catch (err) {
      throw APIError({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Can not get any of cities',
        error: err,
      });
    }
  };
}

export { CitiesCtrl };
