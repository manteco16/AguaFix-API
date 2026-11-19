import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: envs.corsOrigins
      ? envs.corsOrigins.split(',').map((origin) => origin.trim())
      : true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(envs.port, '0.0.0.0');

  console.log(`AguaFix API escuchando en el puerto ${envs.port}`);
}

bootstrap();
