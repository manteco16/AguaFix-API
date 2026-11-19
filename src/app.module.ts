import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from './config/envs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    ReportsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
