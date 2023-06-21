export interface IAppConfig {
  nodeEnv: 'development' | 'production';
  port: number;
  accessKey: string;
}

export interface IDbConfig {
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
}
