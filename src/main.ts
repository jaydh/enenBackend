import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';
import * as pem from 'pem';
import * as express from 'express';

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  if (err) {
    throw err;
  }
  bootstrap(keys);
});

async function bootstrap(keys: { serviceKey: any; certificate: any }) {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keys.serviceKey,
      cert: keys.certificate,
    },
  });
  app.enableCors();
  await app.listen(4300);
}
