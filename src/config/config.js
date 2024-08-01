require('dotenv').config();

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  pg: {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  },
  jwt: {
    accessToken: process.env.ACCESS_TOKEN_KEY,
    refreshToken: process.env.REFRESH_TOKEN_KEY,
    accessTokenAge: process.env.ACCESS_TOKEN_AGE,
  },
  rabbitmq: {
    server: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
