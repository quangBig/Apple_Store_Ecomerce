import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PagesModule } from './page-home/page.module';
import { PageProductsModule } from './page-prodcuts/page-products.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.sevice';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available throughout the app
      envFilePath: '.env', // Explicitly specify the env file paths
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      autoIndex: true, // Automatically build indexes (good for development)
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    PagesModule,
    PageProductsModule,
    // Ensure ProductsModule is imported here
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule { }