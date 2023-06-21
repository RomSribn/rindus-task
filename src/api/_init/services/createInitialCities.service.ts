import path from 'path';
import httpStatus from 'http-status';
import { Transaction } from 'sequelize';
import { City } from '@api/cities/models/City.model';
import { IServiceResponse } from '@interfaces/common.interfaces';
import { CITIES_PATH, JSON_EXTENSION } from '@utils/common.utils';

type IProps = {
  transaction?: Transaction;
};

export interface IResult {
  cities: City[];
}

export const createInitialCities = async ({ transaction }: IProps): Promise<IServiceResponse<IResult>> => {
  try {
    const CITIES = require(CITIES_PATH);
    const fileExtension = path.extname(CITIES_PATH);

    if (fileExtension !== JSON_EXTENSION) {
      throw new Error('Unsupported file extension');
    }

    const cities: IResult['cities'] = await Promise.all(
      CITIES.map(
        async ({ name }) =>
          await City.create(
            {
              name,
            },
            { transaction },
          ),
      ),
    );

    return {
      result: { cities },
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
