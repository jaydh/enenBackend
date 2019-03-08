import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors();
  await app.listen(4300);
}
bootstrap();
