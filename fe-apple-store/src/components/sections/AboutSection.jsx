import React from "react";

const features = [
    {
        icon: "��",
        title: "Chính hãng 100%",
        desc: "Sản phẩm Apple chính hãng, bảo hành toàn quốc."
    },
    {
        icon: "🚚",
        title: "Giao hàng nhanh",
        desc: "Giao hàng toàn quốc, nhận hàng trong 1-3 ngày."
    },
    {
        icon: "🔒",
        title: "Thanh toán an toàn",
        desc: "Nhiều phương thức thanh toán, bảo mật tuyệt đối."
    },
    {
        icon: "💬",
        title: "Hỗ trợ 24/7",
        desc: "Tư vấn và hỗ trợ khách hàng mọi lúc, mọi nơi."
    },
];

const AboutSection = () => (
    <section
        data-aos="fade-up"
        className="w-[80%] flex my-16 p-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-gradient-x overflow-hidden rounded-xl mx-auto"
        style={{ minHeight: '420px' }}
    >
        <div className="w-full flex flex-col items-center py-12 px-2 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 drop-shadow-md text-center">Về chúng tôi</h2>
            <p className="text-lg text-gray-500 mb-8 text-center max-w-2xl">
                Apple Store cam kết mang đến cho khách hàng sản phẩm và dịch vụ tốt nhất, hàng Apple chính hãng, trải nghiệm mua sắm hiện đại, an toàn và tiện lợi.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mt-4">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="flex flex-col items-center bg-white rounded-xl shadow p-6 h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="text-4xl mb-2 animate-bounce-slow">{f.icon}</div>
                        <div className="font-bold text-lg mb-1 text-gray-900">{f.title}</div>
                        <div className="text-gray-500 text-center text-sm">{f.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default AboutSection; 