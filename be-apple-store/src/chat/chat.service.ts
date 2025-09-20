import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product, ProductDocument } from "src/products/schemas/products.schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat, ChatDocument } from "./schemas/chat.schemas";
import { ChatResponseDto } from "./dto/chat-reponsive.dto";


const detectIntentPrompt = `
Bạn là một bộ phân loại intent cho chatbot bán hàng.

Intent hợp lệ:
- product_info
- stock
- combo
- policy
- shipping_payment
- promotion
- other

Chỉ trả về đúng 1 từ trong số trên.
`;

const sentimentPrompt = `
Bạn là bộ phân loại cảm xúc của đoạn chat:
- good
- bad
- neutral
Chỉ trả về đúng 1 từ.
`;

@Injectable()
export class ChatService {
    private genAI: GoogleGenerativeAI;

    constructor(
        @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    }

    private async runGemini(prompt: string, message: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`${prompt}\n\nCâu hỏi: ${message}`);
            return result.response.text().trim();
        } catch (err: any) {
            console.error("Gemini API error:", err.message || err);

            // fallback khi quota hoặc API lỗi
            return "fallback";
        }
    }

    private async detectIntent(message: string): Promise<string> {
        const intent = await this.runGemini(detectIntentPrompt, message);
        const valid = ["product_info", "stock", "combo", "policy", "shipping_payment", "promotion", "other"];
        return valid.includes(intent) ? intent : "other";
    }

    private async analyzeSentiment(message: string): Promise<string> {
        const sentiment = await this.runGemini(sentimentPrompt, message);
        const valid = ["good", "bad", "neutral"];
        return valid.includes(sentiment) ? sentiment : "neutral";
    }


    private async generateReply(intent: string, message: string): Promise<string> {
        if (intent === "other") {
            return "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến sản phẩm và dịch vụ của shop.";
        }

        try {
            const products = await this.productModel.find().lean();
            const productInfo = products
                .map(
                    (p) =>
                        `Tên: ${p.name}, Giá: ${p.variants?.[0]?.discountedPrice || p.variants?.[0]?.price || "N/A"}`
                )
                .join("\n");

            const contextPrompt = `
Bạn là chatbot của shop. Dưới đây là dữ liệu sản phẩm:
${productInfo}

Nhiệm vụ:
- Trả lời ngắn gọn, chính xác dựa trên dữ liệu trên.
- Không bịa đặt nếu không có trong dữ liệu.
- Câu hỏi của khách: "${message}"
`;


            const model = this.genAI.getGenerativeModel({ model: "gemini-2.0" });
            const result = await model.generateContent(contextPrompt);
            return result?.response?.text()?.trim() || "Xin lỗi, hiện tại tôi không thể trả lời câu hỏi này.";
        } catch (err) {
            console.error("Error generating reply:", err);
            return "Xin lỗi, hiện tại hệ thống chatbot đang gặp sự cố.";
        }
    }
    async getAllChats() {
        try {
            // Lấy tất cả chat, bao gồm cả user và guest
            const chats = await this.chatModel.find().sort({ createdAt: -1 }).lean();
            return chats.map(chat => ({
                userId: chat.userId || "guest",
                message: chat.message,
                reply: chat.reply,
                sentiment: chat.sentiment,
                intent: chat.intent,
                createdAt: chat.createdAt,
            }));
        } catch (err) {
            console.error("Error fetching all chats:", err);
            return [];
        }
    }


    async processMessage(userId: string | null, message: string): Promise<ChatResponseDto> {
        try {
            const [intent, sentiment] = await Promise.all([
                this.detectIntent(message),
                this.analyzeSentiment(message),
            ]);

            const reply = await this.generateReply(intent, message);

            // Lưu DB nếu có userId
            if (userId) {
                const chat = await this.chatModel.create({
                    userId,
                    message,
                    reply,
                    sentiment,
                    intent,
                });

                return {
                    userId,
                    message,
                    reply,
                    sentiment,
                    intent,
                    createdAt: chat.createdAt,
                };
            }


            return {
                userId: "guest",
                message,
                reply,
                sentiment,
                intent,
                createdAt: new Date(),
            };
        } catch (err) {
            console.error("Error processing message:", err);
            return {
                userId: userId || "guest",
                message,
                reply: "Xin lỗi, hệ thống đang quá tải hoặc hết quota Gemini.",
                sentiment: "neutral",
                intent: "other",
                createdAt: new Date(),
            };
        }
    }


    async getSentimentStats() {
        return this.chatModel.aggregate([
            { $group: { _id: "$sentiment", count: { $sum: 1 } } },
        ]);
    }

    async getIntentStats() {
        return this.chatModel.aggregate([
            { $group: { _id: "$intent", count: { $sum: 1 } } },
        ]);
    }
}