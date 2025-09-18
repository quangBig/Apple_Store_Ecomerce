import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { Chat, ChatSchema } from "./schemas/chat.schemas";
import { Product, ProductSchema } from "src/products/schemas/products.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule { }
