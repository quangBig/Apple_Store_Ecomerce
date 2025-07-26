import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // hoặc true nếu muốn cho phép tất cả
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
