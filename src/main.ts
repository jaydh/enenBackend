import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sslSecret, sslRoute } from './keys';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: sslSecret,
      cert: sslRoute,
    },
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
