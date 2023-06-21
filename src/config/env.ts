import dotenv from 'dotenv';
import config from '12factor-config';
import { IAppConfig, IDbConfig } from '@interfaces/env.interfaces';

dotenv.config();

export const appConfig: IAppConfig = config({
  nodeEnv: {
    env: 'NODE_ENV',
    type: 'string',
    required: true,
    default: 'NODE_ENV REQUIRED',
  },
  port: {
    env: 'PORT',
    type: 'string',
    required: false,
    default: 3000,
  },
  accessKey: {
    env: 'ACCESS_KEY',
    type: 'string',
    required: false,
    default: 'ACCESS_KEY REQUIRED FOR INITIALIZE APP',
  },
});

export const dbConfig: IDbConfig = config({
  dbName: {
    env: 'DB_NAME',
    type: 'string',
    required: true,
    default: 'DB_NAME REQUIRED',
  },
  dbUsername: {
    env: 'DB_USERNAME',
    type: 'string',
    required: false,
    default: 'DB_USERNAME REQUIRED',
  },
  dbPassword: {
    env: 'DB_PASSWORD',
    type: 'string',
    required: false,
    default: 'DB_PASSWORD REQUIRED',
  },
  dbHost: {
    env: 'DB_HOST',
    type: 'string',
    required: false,
    default: 'DB_HOST REQUIRED',
  },
  dbPort: {
    env: 'DB_PORT',
    type: 'string',
    required: false,
    default: 'DB_PORT REQUIRED',
  },
});
