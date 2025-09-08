import { useState } from "react";

const features = [
    {
        title: "iPhone và Mac",
        content:
            "Với Phản Chiếu iPhone, bạn có thể xem và điều khiển màn hình iPhone trên máy Mac mà không cần chạm tay vào điện thoại. Các tính năng Thông Suốt cũng giúp bạn trả lời cuộc gọi hoặc tin nhắn từ iPhone ngay trên máy Mac...",
        image: "/images/mac-iphone.png", // ảnh minh họa
    },
    {
        title: "iPhone và Apple Watch",
        content:
            "Để quên iPhone của bạn ở đâu đó? Các phiên bản Apple Watch mới nhất có thể hiển thị cho bạn biết phương hướng và khoảng cách gần đúng của điện thoại...",
        image: "/images/apple-watch.png",
    },
    {
        title: "iPhone và AirPods",
        content:
            "Âm thanh sẽ tự động chuyển tiếp giữa iPhone và AirPods để bạn nghe liền mạch hơn...",
        image: "/images/airpods.png",
    },
];

export default function ProductConnect() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-16 rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Nửa kia hoàn hảo.
            </h2>
            <div className="flex justify-center">
                <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Text + Accordion */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                                Danh sách tính năng
                            </h2>

                            <div className="space-y-3">
                                {features.map((f, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <button
                                            onClick={() => setActiveIndex(idx)}
                                            className="flex justify-between items-center w-full px-5 py-4 text-left"
                                        >
                                            <span className="text-lg font-semibold text-gray-800">
                                                {f.title}
                                            </span>
                                            <span
                                                className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${activeIndex === idx
                                                        ? "rotate-45 bg-black text-white border-black"
                                                        : "bg-gray-100 text-gray-600 border-gray-300"
                                                    }`}
                                            >
                                                +
                                            </span>
                                        </button>

                                        {/* Content */}
                                        <div
                                            className={`px-5 pb-4 text-gray-600 text-sm leading-relaxed transition-all duration-300 ${activeIndex === idx
                                                    ? "max-h-96 opacity-100"
                                                    : "max-h-0 opacity-0 overflow-hidden"
                                                }`}
                                        >
                                            {f.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src={features[activeIndex].image}
                                alt={features[activeIndex].title}
                                className="w-full max-w-md object-contain rounded-2xl shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}
