import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',

  host: '127.0.0.1',
  port: 5432,

  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],

  synchronize: false,
});

export default dataSource;