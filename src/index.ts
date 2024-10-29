import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.APP_PORT || 8080);
  console.log(`http://localhost:${process.env.APP_PORT || 8080}`);
  console.log('hi');
  console.log(`http://localhost:${process.env.APP_PORT || 8080}/graphql`);
}
bootstrap();
