import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import express from 'express';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';

// Tạo Express instance
const server = express();

let isAppInitialized = false;

async function bootstrap() {
  if (isAppInitialized) return; // Chỉ khởi tạo một lần

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );

  // Body limit
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // CORS - CẬP NHẬT ORIGIN cho production
  app.enableCors({
    origin: [
      'http://localhost:5173'// THAY BẰNG URL THẬT
    ],
    credentials: true,
  });

  // TẠM COMMENT LẠI DÒNG NÀY
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.init();
  isAppInitialized = true;
}

// Khởi tạo app ngay khi function được load
bootstrap().catch(console.error);

// Export handler cho Vercel
export default serverless(server); // Sử dụng default export