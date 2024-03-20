import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { config } from 'dotenv';
import helmet from 'helmet';

config(); // parse the application env variables

async function bootstrap() {
  /**
   * create a new nestjs application and initialize reading the environment variables, via the ConfigService
   *
   * Also, auto assign port
   */
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  /**
   * Helmet can help protect app from well know HTTp vulnerabilities by settings HTTP headers appropriately
   * Helmet is just a collection of smaller middleware functions that set security-related HTTP headers
   */
  app.use(helmet());
  /**
   * the compression middleware help gzip  responses
   * this helps optimize  the application speed
   */
  /**
   * core makes it possible for client applications (web and mobile) to communicate with the server
   * this can also be extended to restrict the request source in the futures
   */
  app.enableCors();
  // catch application level exception, such as undefined endpoint
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // await app.listen(port);
}

bootstrap();
