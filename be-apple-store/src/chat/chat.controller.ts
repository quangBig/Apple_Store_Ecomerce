import { Controller, Post, Body, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    async create(@Body() dto: CreateChatDto) {
        return this.chatService.processMessage(dto.userId, dto.message);
    }

    @Get("stats/sentiment")
    async getSentimentStats() {
        return this.chatService.getSentimentStats();
    }

    @Get("stats/intent")
    async getIntentStats() {
        return this.chatService.getIntentStats();
    }
}
