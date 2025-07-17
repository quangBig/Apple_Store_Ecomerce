import React from "react";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { Link } from 'react-router-dom';

const products = [
    {
        title: "AirPods",
        desc: "Cân bằng hoàn hảo giữa âm thanh chất lượng cao và sự kỳ diệu của AirPods.",
        image: "/Screenshot_2025-07-10_174457-removebg-preview.png",
        link: "/airpods",
    },
    {
        title: "iPhone",
        desc: "Titanium. Siêu bền. Siêu nhẹ. Siêu Pro. Trải nghiệm iPhone đỉnh cao.",
        image: "/Screenshot_2025-07-10_174131-removebg-preview.png",
        link: "/iphone",
        reverse: true,
    },
    {
        title: "iPad",
        desc: "Sức mạnh từ chip Apple M2. Chiếc iPad tiên tiến nhất từ trước đến nay.",
        image: "/Screenshot_2025-07-10_174346-removebg-preview.png",
        link: "/ipad",
    },
    {
        title: "Apple Watch ",
        desc: "Thông minh hơn. Sáng hơn. Mạnh mẽ hơn. Tương lai của sức khỏe trên cổ tay bạn.",
        image: "/Screenshot_2025-07-10_174554-removebg-preview.png",
        link: "/watch",
        reverse: true,
    },
    {
        title: "MacBook ",
        desc: "Sức mạnh từ chip M2. Nhẹ. Nhanh. Đỉnh cao. Chiếc laptop tốt nhất cho mọi người.",
        image: "/Screenshot_2025-07-10_174701-removebg-preview.png",
        link: "/mac",
    },
];

const HomePage = () => (
    <div className="w-full min-h-screen bg-white text-black">
        <Header />
        <HeroSection />

        {products.map((p, idx) => (
            <ProductSection key={p.title} {...p} aosDelay={idx * 150} />
        ))}
        <ContactSection />
        <AboutSection />
        <Footer />
        <ChatBot />
    </div>
);

export default HomePage; 