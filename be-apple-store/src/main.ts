import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as express from 'express'; // Thêm import cho express
import { join } from 'path'; // Thêm import cho join từ path

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tăng giới hạn kích thước body lên 50MB
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: 'http://localhost:5173', // hoặc true nếu muốn cho phép tất cả
    credentials: true,
  });


  // Phục vụ file tĩnh từ thư mục uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();