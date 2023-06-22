import { Weather } from '../models/Weather.model';
import { City } from '@api/cities/models/City.model';
import { Condition } from '../models/Condition.model';

type TParsedWeather = {
  date: Date;
  temperature: number;
  conditions: Condition[];
};

type TResponseItem = {
  name: string;
  averageTmp: number;
  weather: TParsedWeather[];
};
/**
 * @description Get all cities weather or weather by city id.
 * @params cityId
 * @returns {Promise<TResponseItem[]>} { name, averageTmp, weather }[]
 */
export const getWeatherData = async (cityId?: number): Promise<TResponseItem[]> => {
  const where: { id?: number } = {};

  if (cityId) {
    where.id = cityId;
  }

  const weather = await City.findAll({
    where,
    include: [
      {
        model: Weather,
        attributes: ['date', 'temperature'],
        include: [
          {
            model: Condition,
            attributes: ['name'],
          },
        ],
      },
    ],
    attributes: ['name'],
  });

  const result: TResponseItem[] = weather.map(currentCity => {
    const weather: TParsedWeather[] = Object.values(
      currentCity.weather.reduce((result: { [utcTime: number]: TParsedWeather }, currentWeather) => {
        const utcTime = new Date(currentWeather.date).getTime();
        if (!result[utcTime]) {
          result[utcTime] = {
            date: currentWeather.date,
            temperature: currentWeather.temperature,
            conditions: [currentWeather.condition],
          };
          return result;
        }
        result[utcTime].conditions.push(currentWeather.condition);
        return result;
      }, {}),
    );

    const averageTmp = (weather.reduce((sum, { temperature }) => sum + temperature, 0) as number) / weather.length;

    return { name: currentCity.name, averageTmp: Math.floor(averageTmp), weather };
  });

  return result;
};
