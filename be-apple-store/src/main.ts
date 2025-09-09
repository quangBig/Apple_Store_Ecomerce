import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import express from 'express';
import { join } from 'path';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server) // NestJS dùng Express của serverless
  );

  // Body limit
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Static uploads
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.init(); // Không listen trực tiếp
}

bootstrap();

// Export handler cho Vercel
export const handler = serverless(server);
