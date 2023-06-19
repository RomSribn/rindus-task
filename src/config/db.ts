import 'reflect-metadata';
import { dbConfig } from './env';
import { Sequelize } from 'sequelize-typescript';

const { dbName, dbUsername, dbPassword, dbHost, dbPort } = dbConfig;

const mainDBConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  models: [],

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default mainDBConnection;
