export interface ChatMessage {
    userId: string;
    message: string;
    sender: 'user' | 'bot';
    sentiment?: string;
    intent?: string;
    createdAt: Date;
}