import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { envs } from '../config/envs';
import { User } from '../auth/entities/user.entity';
import { Report } from '../reports/entities/report.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: envs.database.host,
  port: envs.database.port,
  username: envs.database.username,
  password: envs.database.password,
  database: envs.database.database,

  entities: [User, Report],

  // En producción las migraciones compiladas viven en dist/db/migrations.
  // El comando se ejecuta desde la raíz del proyecto (/app dentro del contenedor).
  migrations: ['dist/db/migrations/*.js'],

  synchronize: false,
  logging: false,
});

export default dataSource;
