import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'colors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSwaggerOptions, getSwaggerOptionsCustom } from './utils/swagger';
import AppModule from './app.module';
import multipart from '@fastify/multipart';
import https from './utils/https';

// For definition of application mode
/**
 * depends from prod or dev mode applicatiton chooses
 * DB's connection and console.log ooutputs
 * (on dev logs are "ON", and on prod they are turned off)
 */
export const node = process.env.NODE_ENV;
// For dev or prod http/https connection;
class bootstrapOptions {
  constructor() {
    this.adapter =
      node === 'prod'
        ? new FastifyAdapter({
            https: https()!,
          })
        : new FastifyAdapter();
  }
  adapter: FastifyAdapter;
}

async function bootstrap() {
  console.log(node!.yellow);
  const options = new bootstrapOptions();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    options.adapter,
  );
  app.register(multipart);
  const config = new DocumentBuilder().setTitle('').setVersion('').build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerOptionsCustom());
  await app.listen(process.env.PORT ?? 4070, '0.0.0.0');
  console.log(
    'Server running on',
    `${await app.getUrl()}/docs`.replace(
      'http',
      node === 'dev' ? 'http' : 'https',
    ).yellow,
  );
}
bootstrap();
