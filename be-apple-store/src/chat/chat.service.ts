import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./schemas/chat.schemas";
import { Product, ProductDocument } from "src/products/schemas/products.schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`${prompt}\n\nCâu hỏi: ${message}`);
        return result.response.text().trim();
    }

    private async detectIntent(message: string): Promise<string> {
        return this.runGemini(detectIntentPrompt, message);
    }

    private async analyzeSentiment(message: string): Promise<string> {
        return this.runGemini(sentimentPrompt, message);
    }

    private async generateReply(intent: string, message: string): Promise<string> {
        if (intent === "other") {
            return "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi liên quan đến sản phẩm và dịch vụ của shop.";
        }

        const products = await this.productModel.find().lean();
        const productInfo = products
            .map(
                (p) =>
                    `Tên: ${p.name}, Giá: ${p.variants?.[0]?.discountedPrice ||
                    p.variants?.[0]?.price ||
                    "N/A"
                    }`,
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

        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(contextPrompt);
        return result.response.text().trim();
    }

    async processMessage(userId: string, message: string) {
        const intent = await this.detectIntent(message);
        const sentiment = await this.analyzeSentiment(message);
        const reply = await this.generateReply(intent, message);

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
            createdAt: (chat as any).createdAt,
        };
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
