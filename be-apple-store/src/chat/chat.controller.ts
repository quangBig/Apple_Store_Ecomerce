import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";


@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) { }
    @Get()
    async getAllChats() {
        const chats = await this.chatService.getAllChats();
        return { data: chats };
    }

    // Guest chat (không đăng nhập, không lưu DB)
    @Post("guest")
    async guestChat(@Body() dto: CreateChatDto) {
        return this.chatService.processMessage(null, dto.message);
    }

    // User chat (phải login, có userId -> lưu DB)
    @UseGuards(JwtAuthGuard)
    @Post()
    async userChat(@Body() dto: CreateChatDto, @Req() req) {
        const userId = req.user.userId;
        return this.chatService.processMessage(userId, dto.message);
    }

    // Thống kê sentiment
    @Get("stats/sentiment")
    async getSentimentStats() {
        return this.chatService.getSentimentStats();
    }

    // Thống kê intent
    @Get("stats/intent")
    async getIntentStats() {
        return this.chatService.getIntentStats();
    }
}
