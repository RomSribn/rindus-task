import httpStatus from 'http-status';
import { Response, Request } from 'express';
import { APIError, APIResponse } from '@utils/api.utils';
import { getWeatherData } from '../services/getWeatherData.service';

class WeatherCtrl {
  /**
   * @description   Get all Weather with every city.
   * @route         GET /weather
   * @success       { result: TResponseItem[], message: string }
   * @memberof WeatherCtrl
   */
  getWeather = async (_, res: Response) => {
    try {
      const result = await getWeatherData();

      return APIResponse({
        res,
        data: {
          result,
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
  /**
   * @description   Get weather by cityId.
   * @route         GET /weather/:cityId
   * @success       { result: TResponseItem[], message: string }
   * @memberof WeatherCtrl
   */
  getWeatherByCityId = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
      const result = await getWeatherData(cityId);

      if (!result.length) {
        throw APIError({
          res,
          message: 'This city does not exist',
          status: httpStatus.NOT_FOUND,
        });
      }

      return APIResponse({
        res,
        data: {
          result,
          message: 'Success',
        },
      });
    } catch (err) {
      throw APIError({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Can not get weather for this city',
        error: err,
      });
    }
  };
}

export { WeatherCtrl };
