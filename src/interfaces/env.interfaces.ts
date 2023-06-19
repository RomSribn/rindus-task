export interface IAppConfig {
  nodeEnv: 'development' | 'production';
  port: number;
}

export interface IDbConfig {
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
}
