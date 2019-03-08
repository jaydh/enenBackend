import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const keyFile = fs.readFileSync(__dirname + '/ssl/privkey.pem');
  const certFile = fs.readFileSync(__dirname + '/ssl/cert.pem');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  app.enableCors();
  await app.listen(4300);
}
bootstrap();
