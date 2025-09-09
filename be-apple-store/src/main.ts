import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverless from 'serverless-http';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({ origin: '*', credentials: true });

  await app.init();
}

bootstrap();

export const handler = serverless(server);
