import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const envs = {
  mailer: {
    service: env.get('MAILER_SERVICE').required().asString(),
    user: env.get('MAILER_USER').required().asString(),
    password: env.get('MAILER_PASSWORD').required().asString(),
    to: env.get('MAILER_TO').required().asString(),
  },

  database: {
    type: env.get('DB_TYPE').default('postgres').asString(),
    host: env.get('DB_HOST').default('localhost').asString(),
    port: env.get('DB_PORT').default('5432').asPortNumber(),
    username: env.get('DB_USER').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    database: env.get('DB_NAME').required().asString(),
  },

  mapboxToken: env.get('MAPBOX_TOKEN').asString(),
};