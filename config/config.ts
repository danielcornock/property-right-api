const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

interface IDatabases {
  [key: string]: string;
}

export const env: string = process.env.ENV || 'development';

export const port: string = process.env.PORT || '2100';

export const database = (environment: string = 'development') => {
  const databases: IDatabases = {
    development: process.env.DATABASE
      ? process.env.DATABASE.replace(
          '<PASSWORD>',
          process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : ''
        )
      : '',
    local: process.env.DATABASE_LOCAL
      ? process.env.DATABASE_LOCAL.replace('<PORT>', process.env.DB_PORT ? process.env.DB_PORT : '')
      : ''
  };

  return databases[environment];
};

export const jwtSecret: string = process.env.JWT_SECRET || '';

export const jwtExpires: string = process.env.JWT_EXPIRES_IN || '';

export const jwtCookieExpires: string = process.env.JWT_COOKIE_EXPIRES_IN || '';

export const clientPort: string = 'http://localhost:4200';
