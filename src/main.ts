import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from '@common/exceptions/all.exception.filter';
import { RequestInterceptor } from '@common/interceptors/request.iterceptor';
import { ValidationConfig } from '@common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new RequestInterceptor());
  app.useGlobalPipes(new ValidationPipe(new ValidationConfig()));

  await app.listen(process.env.APP_PORT || 3005);
}
bootstrap();
