import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";

import { Product, ProductSchema } from "src/products/schemas/products.schema";
import { Chat, ChatSchema } from "./schemas/chat.schemas";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chat.name, schema: ChatSchema },
            { name: Product.name, schema: ProductSchema }
        ]),
    ],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule { }