import React, { useState } from "react";
import Header from "./Header";

const productVariants = [
    {
        color: "#f5f5f7",
        name: "White",
        image: "/OIP-removebg-preview.png", // Thay bằng ảnh thật nếu có
        bg: "bg-white",
        text: "text-black",
        desc: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
        btn: "border-black text-black hover:bg-black hover:text-white",
    },
    {
        color: "#e5e7eb",
        name: "Gray",
        image: "/0029796_tim-removebg-preview.png",
        bg: "bg-gray-100",
        text: "text-gray-900",
        desc: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
        btn: "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    },
    {
        color: "#2a3138",
        name: "Black",
        image: "/0029805_dem-xanh-tham_550-removebg-preview.png",
        bg: "bg-black",
        text: "text-white",
        desc: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
        btn: "border-white text-white hover:bg-white hover:text-black",
    },

];

const ProductShowcase = () => {
    const [selected, setSelected] = useState(0);
    const [animating, setAnimating] = useState(false);

    const handleColorClick = (idx) => {
        if (idx === selected) return;
        setAnimating(true);
        setTimeout(() => {
            setSelected(idx);
            setAnimating(false);
        }, 350); // Thời gian khớp với transition
    };

    const variant = productVariants[selected];

    // Tính màu logo phù hợp: nếu nền sáng thì logo đen, nền tối thì logo trắng
    const getLogoColor = () => {
        // Nếu màu nền là trắng hoặc xám nhạt thì logo đen, còn lại logo trắng
        if (variant.bg === "bg-white" || variant.bg === "bg-gray-100") return "#111";
        return "#fff";
    };

    return (
        <section
            className={`relative w-full min-h-screen flex flex-col transition-colors duration-500 ${variant.bg}`}
        >
            <Header logoColor={getLogoColor()} />
            {/* Main showcase */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full">
                {/* Big text center */}
                <div className="relative flex flex-col items-center justify-center w-full">
                    <h1
                        className={`select-none font-extrabold text-center leading-none ${variant.text} opacity-10 pointer-events-none`}
                        style={{
                            fontSize: "clamp(2rem, 20vw, 18rem)",
                            zIndex: 1,
                            letterSpacing: "-0.05em",
                        }}
                    >
                        AirPods Max
                    </h1>
                    {/* Product image and shadow over text */}
                    <div
                        className={`absolute mt-10 top-3/4 -translate-x-1/2 -translate-y-2/3 flex flex-col items-center transition-all duration-500 ${animating ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                            }`}
                        style={{ zIndex: 2, transition: "all 0.5s cubic-bezier(.4,0,.2,1)" }}
                        key={selected}
                    >
                        <img
                            src={variant.image}
                            alt={variant.name}
                            className="h-[340px] md:h-[800px] object-contain drop-shadow-2xl"
                        />
                        <div
                            className="-mt-20 w-[180px] md:w-[260px] h-10 md:h-16 bg-black/50 blur-md opacity-40 rounded-full"
                            style={{ filter: "blur(10px)" }}
                        />
                    </div>
                </div>
                {/* Info and actions */}
                <div className="mt-10 flex flex-col items-center z-10">
                    <p className={`mb-6 max-w-md text-center text-xl mt-44 ${variant.text}`}>{variant.desc}</p>
                    <div className="flex items-center gap-3 mb-6">
                        {productVariants.map((v, idx) => (
                            <button
                                key={v.name}
                                className={`w-6 h-6 rounded-full border-2 ${selected === idx ? "border-black scale-110" : "border-gray-300"} transition-transform`}
                                style={{ background: v.color }}
                                onClick={() => handleColorClick(idx)}
                                aria-label={v.name}
                            />
                        ))}
                    </div>
                    <button
                        className={`px-6 py-2 rounded-full border transition ${variant.btn}`}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
            {/* Pagination (giả lập) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <button
                    className={`text-2xl px-3 py-1 rounded-full border border-gray-300 disabled:opacity-30 bg-transparent text-gray-700`}
                    onClick={() => {
                        if (selected > 0) handleColorClick(selected - 1);
                    }}
                    disabled={selected === 0 || animating}
                >
                    {"<"}
                </button>
                <span className="font-semibold text-lg text-gray-700">
                    {String(selected + 1).padStart(2, "0")} <span className="opacity-50 text-gray-700">/ {String(productVariants.length).padStart(2, "0")}</span>
                </span>
                <button
                    className={`text-2xl px-3 py-1 rounded-full border border-gray-300 disabled:opacity-30 bg-transparent text-gray-300`}
                    onClick={() => {
                        if (selected < productVariants.length - 1) handleColorClick(selected + 1);
                    }}
                    disabled={selected === productVariants.length - 1 || animating}
                >
                    {">"}
                </button>
            </div>
        </section>
    );
};

export default ProductShowcase; 