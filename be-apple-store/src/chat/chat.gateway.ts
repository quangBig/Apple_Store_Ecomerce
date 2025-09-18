import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) { }

    @SubscribeMessage("sendMessage")
    async handleMessage(@MessageBody() data: { userId: string; message: string }) {
        const res = await this.chatService.processMessage(data.userId, data.message);
        this.server.emit("receiveMessage", res);
        return res;
    }
}
