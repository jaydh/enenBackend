import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';

const isDev =
  process.env.NODE_ENV === 'dev' ||
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === undefined;

async function bootstrap() {
  const options = { httpsOptions: undefined };
  const keyFile = fs.readFileSync(__dirname + '/ssl/privkey.pem');
  const certFile = fs.readFileSync(__dirname + '/ssl/cert.pem');
  options.httpsOptions = {
    key: keyFile,
    cert: certFile,
  };
  const app = await NestFactory.create(AppModule, options);

  app.enableCors();
  await app.listen(4300);
}
bootstrap();
