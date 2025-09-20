import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { ChatMessage } from "./interface/chat-message.interface";


@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) { }

    @SubscribeMessage("sendMessage")
    async handleMessage(
        @MessageBody() data: { userId: string; message: string },
        @ConnectedSocket() client: Socket
    ) {
        try {
            // Gửi tin nhắn của user đến tất cả clients
            const userMessage: ChatMessage = {
                userId: data.userId,
                message: data.message,
                sender: "user",
                createdAt: new Date()
            };

            this.server.emit("receiveMessage", userMessage);

            // Xử lý tin nhắn và nhận phản hồi từ bot
            const res = await this.chatService.processMessage(data.userId, data.message);

            // Gửi tin nhắn của bot đến tất cả clients
            const botMessage: ChatMessage = {
                userId: "bot",
                message: res.reply,
                sender: "bot",
                sentiment: res.sentiment,
                intent: res.intent,
                createdAt: res.createdAt
            };

            this.server.emit("receiveMessage", botMessage);

            return { status: "success", data: res };
        } catch (error) {
            console.error("Error handling message:", error);
            client.emit("error", { message: "Failed to process message" });
            return { status: "error", message: "Failed to process message" };
        }
    }
}