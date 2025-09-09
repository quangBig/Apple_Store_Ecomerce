import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer: any;

async function bootstrapServer() {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);

    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors();
    await app.init();

    return serverlessExpress({ app: expressApp });
}

export default async function handler(event: any, context: any) {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return cachedServer(event, context);
}
