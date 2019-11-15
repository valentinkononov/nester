import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import config from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

// for hot reload after code change
declare const module: any;

function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Nester API')
    .setDescription('description')
    .setVersion(config.api.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // use Nest-Winston as default logger for API
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // turn on global validation
  // app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix(config.api.root);
  initSwagger(app);
  app.use(compression());

  await app.listen(config.api.port);
  Logger.debug(`Open api health check at: localhost:${config.api.port}/health/status or swagger at: localhost:${config.api.port}/swagger`);
}
bootstrap();
