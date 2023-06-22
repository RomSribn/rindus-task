import httpStatus from 'http-status';
import { Response } from 'express';
import { Condition } from '../models/Condition.model';
import { APIError, APIResponse } from '@utils/api.utils';

class ConditionsCtrl {
  /**
   * @description   Get all conditions.
   * @route         GET /conditions
   * @success       { result: Condition[], message: string }
   * @memberof ConditionsCtrl
   */
  getConditions = async (_, res: Response) => {
    try {
      const conditions = await Condition.findAll();
      
      return APIResponse({
        res,
        data: {
          result: conditions,
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

export { ConditionsCtrl };
