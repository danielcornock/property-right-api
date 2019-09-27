const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

exports.env = process.env.NODE_ENV;

exports.port = process.env.NODE_PORT;

exports.database = environment => {
  const databases = {
    development: process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    ),
    local: process.env.DATABASE_LOCAL.replace('<PORT>', process.env.DB_PORT)
  };
  return databases[environment];
};

exports.jwtSecret = process.env.JWT_SECRET;

exports.jwtExpires = process.env.JWT_EXPIRES_IN;

exports.jwtCookieExpires = process.env.JWT_COOKIE_EXPIRES_IN;
