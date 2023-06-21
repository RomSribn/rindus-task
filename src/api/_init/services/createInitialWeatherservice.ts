import path from 'path';
import httpStatus from 'http-status';
import { Transaction } from 'sequelize';
import { City } from '@api/cities/models/City.model';
import { Weather } from '@api/weather/models/Weather.model';
import { Condition } from '@api/weather/models/Condition.model';
import { IServiceResponse } from '@interfaces/common.interfaces';
import { WEATHER_PATH, JSON_EXTENSION } from '@utils/common.utils';

type IProps = {
  transaction?: Transaction;
  cities: City[];
  conditions: Condition[];
};

export interface IResult {
  cities: City[];
  conditions: Condition[];
}

export const createInitialWeatherservice = async ({
  cities,
  conditions,
  transaction,
}: IProps): Promise<IServiceResponse<any>> => {
  try {
    const WEATHER = require(WEATHER_PATH);

    const fileExtension = path.extname(WEATHER_PATH);

    if (fileExtension !== JSON_EXTENSION) {
      throw new Error('Unsupported file extension');
    }

    WEATHER.forEach(async ({ date, temperature, city, condition }) => {
      const relatedCity = cities.find(({ name }) => name === city);
      const relatedConditions = conditions.filter(dbEl => condition.some(localEl => dbEl.name === localEl.name));

      relatedConditions.forEach(
        async el =>
          await Weather.create(
            {
              date: new Date(date),
              temperature,
              city: relatedCity,
              cityId: relatedCity.id,
              condition: el,
              conditionId: el.id,
            },
            {
              transaction,
            },
          ),
      );
    });

    return {
      result: {
        cities,
        conditions,
      },
    };
  } catch (err) {
    return {
      error: {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error has occured while creating initial content',
      },
    };
  }
};
