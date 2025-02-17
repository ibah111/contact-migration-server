import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'colors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSwaggerOptions, getSwaggerOptionsCustom } from './utils/swagger';

export const node = process.env.NODE_ENV;
// For dev or prod http/https connection;
class bootstrapOptions {
  constructor() {
    this.adapter =
      node === 'prod'
        ? new FastifyAdapter({
            https: {
              //if needed import here https: https()!,
              key: '',
            },
          })
        : new FastifyAdapter();
  }
  adapter: FastifyAdapter;
}

async function bootstrap() {
  const options = new bootstrapOptions();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    options.adapter,
  );
  const config = new DocumentBuilder().setTitle('').setVersion('').build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerOptionsCustom());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(
    'Server running on',
    `${await app.getUrl()}`.replace('http', node === 'dev' ? 'http' : 'https')
      .yellow,
  );
}
bootstrap();
