import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedServer: any;

async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
        app.enableCors();
        await app.init();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer;
}

export default async function handler(req: any, res: any) {
    const server = await bootstrapServer();
    return server(req, res);
}
