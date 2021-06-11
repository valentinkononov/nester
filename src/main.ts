import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import bodyParser from 'body-parser';
import config from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './core/filters/custom-exception.filter';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

function initSwagger(app): void {
    const options = new DocumentBuilder()
        .setTitle('Nester API')
        .setDescription('Nest Framework API template')
        .setVersion(config.api.version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
}

async function bootstrap(): Promise<void> {
    // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    //   cors: true,
    // });

    const app = await NestFactory.create<NestApplication>(AppModule, {
        cors: true,
    });

    // turn on global validation
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.useGlobalFilters(new CustomExceptionFilter(app));

    app.use(compression());
    app.use(bodyParser.json({ limit: '1mb' }));

    initSwagger(app);
    app.use(compression());

    await app.listen(Number(config.api.port));
    Logger.debug(
        `Open api health check at: localhost:${config.api.port}/health/status or swagger at: localhost:${config.api.port}/swagger`,
    );
}
bootstrap();
