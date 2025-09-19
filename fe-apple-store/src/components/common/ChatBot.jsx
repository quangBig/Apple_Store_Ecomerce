import React, { useState, useRef, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useChatStore } from "../../stores/useChatStore";


const BOT_NAME = "AppleBot";
const BOT_AVATAR = "/apple-logo-black-isolated-on-transparent-background-free-vector.jpg";

const ChatBot = ({ userId = "guest-123" }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const { connectSocket, sendMessage, messages } = useChatStore();
    const messagesEndRef = useRef(null);

    // Tự động kết nối socket khi mở chat
    useEffect(() => {
        if (open) {
            connectSocket(userId);
        }
    }, [open]);

    // Auto scroll xuống cuối
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = (e) => {
        try {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage(userId, input);
            setInput("");
        }
        catch (err) {
            console.log(messages.err, "send mes")
        }
        // e.preventDefault();
        // if (!input.trim()) return;
        // sendMessage(userId, input);
        // setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Floating button */}
            {!open && (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300 focus:outline-none"
                    onClick={() => setOpen(true)}
                >
                    <ChatIcon fontSize="large" />
                </button>
            )}

            {/* Chat window */}
            {open && (
                <div className="fixed bottom-20 right-6 w-96 max-w-[95vw] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadein-up">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <img src={BOT_AVATAR} alt="bot" className="w-8 h-8 rounded-full bg-white" />
                            <span className="text-white font-bold text-lg">{BOT_NAME}</span>
                        </div>
                        <button onClick={() => setOpen(false)} className="text-white hover:bg-blue-700 rounded-full p-1">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 px-4 py-5 bg-gray-50 overflow-y-auto" style={{ maxHeight: "420px" }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-2 flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`rounded-xl px-3 py-2 text-sm max-w-[80%] ${msg.userId === userId ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {msg.userId === userId ? msg.message : msg.reply}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-2 bg-white border-t">
                        <input
                            type="text"
                            className="flex-1 border rounded-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-semibold text-base transition-all duration-200"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
