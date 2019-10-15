const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

interface IDatabases {
  development: string | null;
  local: string | null;
}

export const env = process.env.NODE_ENV;

export const port = process.env.NODE_PORT;

export const database = (environment: string) => {
  const databases: IDatabases = {
    development: process.env.DATABASE
      ? process.env.DATABASE.replace(
          '<PASSWORD>',
          process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : ''
        )
      : null,
    local: process.env.DATABASE_LOCAL
      ? process.env.DATABASE_LOCAL.replace(
          '<PORT>',
          process.env.DB_PORT ? process.env.DB_PORT : ''
        )
      : null
  };
  return databases[environment];
};

export const jwtSecret: string = process.env.JWT_SECRET;

export const jwtExpires = process.env.JWT_EXPIRES_IN;

export const jwtCookieExpires = process.env.JWT_COOKIE_EXPIRES_IN;
