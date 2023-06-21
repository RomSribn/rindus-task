import httpStatus from 'http-status';
import { appConfig } from '@config/env';
import { Request, Response } from 'express';
import { APIError } from '@utils/api.utils';
import { executeTransaction } from '@utils/transactions.utils';
import { createInitialCities } from './services/createInitialCities.service';
import { createInitialWeatherservice } from './services/createInitialWeatherservice';
import { createInitialConditions } from './services/createInitialConditions.service';

class _InitCtrl {
  runAppInit = async (req: Request, res: Response) => {
    executeTransaction(async t => {
      try {
        const { accessKey } = req.body;

        if (accessKey !== appConfig.accessKey) {
          throw res.status(httpStatus.FORBIDDEN).json({
            message: 'Not enough rights',
          });
        }

        const {
          error: citiesError,
          result: { cities },
        } = await createInitialCities({
          transaction: t,
        });

        if (citiesError) {
          throw APIError({
            res,
            ...citiesError,
          });
        }

        const {
          error: conditionsError,
          result: { conditions },
        } = await createInitialConditions({
          transaction: t,
        });

        if (conditionsError) {
          throw APIError({
            res,
            ...conditionsError,
          });
        }

        const { error: weatherError } = await createInitialWeatherservice({
          cities,
          conditions
        });

        if (weatherError) {
          throw APIError({
            res,
            ...weatherError,
          });
        }

        return res.status(httpStatus.OK).json({
          message: 'App was successfully initialized',
        });
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'App initialization failed',
          error: err,
        });
      }
    });
  };
}

export { _InitCtrl };
