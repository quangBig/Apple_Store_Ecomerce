import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

async function bootstrap() {
    if (!server) {
        const app = await NestFactory.create(AppModule);
        await app.init();
        const expressApp = app.getHttpAdapter().getInstance();
        server = serverlessExpress({ app: expressApp });
    }
    return server;
}

export const handler = async (event: any, context: any) => {
    const serverInstance = await bootstrap();
    return serverInstance(event, context);
};
