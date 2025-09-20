// src/stores/useChatStore.ts
import { create } from "zustand";
import axios from "../lib/axios";

interface Message {
    sender: "user" | "bot";
    message: string;
}

interface ChatState {
    messages: Message[];
    sendMessage: (msg: string, token?: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],

    sendMessage: async (msg, token) => {
        if (!msg.trim()) return;

        // đẩy msg user lên UI trước
        set((state) => ({
            messages: [...state.messages, { sender: "user", message: msg }],
        }));

        try {
            const url = token
                ? "http://localhost:5000/chat" // login => lưu DB
                : "http://localhost:5000/chat/guest"; // guest => không lưu DB

            const res = await axios.post(
                url,
                { message: msg },
                token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : undefined
            );

            // bot trả lời
            set((state) => ({
                messages: [
                    ...state.messages,
                    { sender: "bot", message: res.data.reply },
                ],
            }));
        } catch (err) {
            set((state) => ({
                messages: [
                    ...state.messages,
                    { sender: "bot", message: "❌ Lỗi kết nối server" },
                ],
            }));
        }
    },
}));
