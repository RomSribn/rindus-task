import path from 'path';
import httpStatus from 'http-status';
import { Transaction } from 'sequelize';
import { Condition } from '@api/weather/models/Condition.model';
import { IServiceResponse } from '@interfaces/common.interfaces';

type IProps = {
  transaction?: Transaction;
};

export interface IResult {
  conditions: Condition[];
}

export const createInitialConditions = async ({ transaction }: IProps): Promise<IServiceResponse<IResult>> => {
  try {
    const CITIES = require('@api/_init/data/conditions.json');
    const fileExtension = path.extname('@api/_init/data/conditions.json');

    if (fileExtension !== '.json') {
      throw new Error('Unsupported file extension');
    }

    const conditions: IResult['conditions'] = await Promise.all(
      CITIES.map(
        async ({ name }) =>
          await Condition.create(
            {
              name,
            },
            { transaction },
          ),
      ),
    );

    return {
      result: { conditions },
    };
  } catch (err) {
    return {
      error: {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error has occured while creating initial categories',
      },
    };
  }
};
