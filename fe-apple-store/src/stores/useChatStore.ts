// src/store/chatStore.ts
import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import axios from "../lib/axios";

export interface ChatMessage {
    userId: string;
    message: string;
    reply: string;
    sentiment: string;
    intent: string;
    createdAt: string;
}

interface ChatState {
    messages: ChatMessage[];
    socket: Socket | null;
    connectSocket: (userId: string) => void;
    sendMessage: (userId: string, message: string) => void;
    loadStats: () => Promise<{ sentiment: any; intent: any }>;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    socket: null,

    connectSocket: (userId: string) => {
        const socket = io("http://localhost:5000", { transports: ["websocket"] });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });

        socket.on("receiveMessage", (msg: ChatMessage) => {
            set((state) => ({ messages: [...state.messages, msg] }));
        });

        set({ socket });
    },

    sendMessage: (userId, message) => {
        const socket = get().socket;
        if (socket) {
            socket.emit("sendMessage", { userId, message });
        }
    },

    loadStats: async () => {
        const sentimentRes = await axios.get("/chat/stats/sentiment");
        const intentRes = await axios.get("/chat/stats/intent");
        return { sentiment: sentimentRes.data, intent: intentRes.data };
    },
}));
