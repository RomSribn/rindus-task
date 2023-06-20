import 'reflect-metadata';
import { dbConfig } from './env';
import { Sequelize } from 'sequelize-typescript';
import { City } from '../api/cities/models/City.model';
import { Weather } from '../api/weather/models/Weather.model';
import { Condition } from '../api/weather/models/Condition.model';

const { dbName, dbUsername, dbPassword, dbHost, dbPort } = dbConfig;

const mainDBConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  models: [City, Weather, Condition],

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default mainDBConnection;
