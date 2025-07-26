import React from "react";
import DeviceShowcase from "../../components/sections/DeviceShowcase";
import FeatureCarousel from "../../components/common/FeatureCarousel";
import ProductList from "../../components/product/ProductList";
import WhyAppleSection from "../../components/common/WhyAppleSection";
import ProductDetailComparison from "../../components/product/ProductDetailComparison";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";

const macModels = {
    "air": {
        name: "MacBook Air",
        features: [
            {
                product: "MacBook Air",
                image: '/macbookair-silver.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip M2 mạnh mẽ',
                description: 'Sức mạnh vượt trội cho mọi tác vụ.',
                bg: 'bg-gray-100'
            },
            {
                product: "MacBook Air",
                image: '/macbookair-midnight.png',
                subtitle: 'Thiết Kế',
                title: 'Siêu nhẹ, siêu mỏng',
                description: 'Dễ dàng mang theo mọi nơi.',
                bg: 'bg-blue-50'
            },
            {
                product: "MacBook Air",
                image: '/OIP__1_-removebg-preview.png',
                subtitle: 'Pin',
                title: 'Thời lượng pin ấn tượng',
                description: 'Làm việc cả ngày không lo hết pin.',
                bg: 'bg-green-50'
            },
        ]
    },
    "pro": {
        name: "MacBook Pro",
        features: [
            {
                product: "MacBook Pro",
                image: '/macbookair-silver.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip M3 Pro',
                description: 'Hiệu năng đỉnh cao cho chuyên nghiệp.',
                bg: 'bg-gray-100'
            },
            {
                product: "MacBook Pro",
                image: '/macbookair-midnight.png',
                subtitle: 'Thiết Kế',
                title: 'Bền bỉ, sang trọng',
                description: 'Thiết kế nhôm nguyên khối.',
                bg: 'bg-blue-50'
            },
            {
                product: "MacBook Pro",
                image: '/OIP__1_-removebg-preview.png',
                subtitle: 'Pin',
                title: 'Pin lâu',
                description: 'Làm việc cả ngày không lo hết pin.',
                bg: 'bg-green-50'
            },
        ]
    },
    "imac": {
        name: "iMac",
        features: [
            {
                product: "iMac",
                image: '/macbookair-silver.png',
                subtitle: 'Màn hình lớn',
                title: 'Trải nghiệm hình ảnh tuyệt vời',
                description: 'Màn hình Retina sắc nét.',
                bg: 'bg-yellow-50'
            },
            {
                product: "iMac",
                image: '/macbookair-midnight.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip M3',
                description: 'Xử lý mượt mà mọi tác vụ.',
                bg: 'bg-blue-50'
            },
            {
                product: "iMac",
                image: '/OIP__1_-removebg-preview.png',
                subtitle: 'Thiết Kế',
                title: 'Tất cả trong một',
                description: 'Thiết kế gọn nhẹ, hiện đại.',
                bg: 'bg-green-50'
            },
        ]
    },
    "mini": {
        name: "Mac mini",
        features: [
            {
                product: "Mac mini",
                image: '/macbookair-silver.png',
                subtitle: 'Nhỏ gọn',
                title: 'Tiết kiệm không gian',
                description: 'Phù hợp mọi góc làm việc.',
                bg: 'bg-gray-100'
            },
            {
                product: "Mac mini",
                image: '/macbookair-midnight.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip M2',
                description: 'Xử lý mượt mà mọi tác vụ.',
                bg: 'bg-blue-50'
            },
            {
                product: "Mac mini",
                image: '/OIP__1_-removebg-preview.png',
                subtitle: 'Kết nối',
                title: 'Đa dạng cổng kết nối',
                description: 'Kết nối mọi thiết bị dễ dàng.',
                bg: 'bg-green-50'
            },
        ]
    },
};

const macVariants = [
    {
        color: "#f5f5f7",
        name: "MacBook Air Bạc",
        image: "/Screenshot_2025-07-15_162956-removebg-preview.png",
        bg: "bg-white",
        text: "text-black",
        desc: "MacBook Air. Sức mạnh từ chip M2.",
        btn: "border-black text-black hover:bg-black hover:text-white",
    },
    {
        color: "#334155",
        name: "MacBook Air Midnight",
        image: "/macbookair-midnight.png",
        bg: "bg-slate-800",
        text: "text-white",
        desc: "MacBook Air. Nhẹ. Nhanh. Đỉnh cao.",
        btn: "border-white text-white hover:bg-white hover:text-slate-800",
    },
];

const macProducts = [
    {
        name: 'MacBook Pro M3',
        image: '/public/Screenshot_2025-07-11_125944-removebg-preview.png',
        colors: ['#222', '#e5e5e5'],
        description: 'Hiệu năng đỉnh cao cho chuyên nghiệp.',
        price: 'Từ 39.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'Apple M3 Pro',
            ai: 'Apple Intelligence',
            camera: 'Camera FaceTime HD 1080p',
            cameraSystem: 'Camera True Tone',
            video: 'Lên đến 18 giờ',
        },
    },
    {
        name: 'MacBook Air M2',
        image: '/public/Screenshot_2025-07-11_122048-removebg-preview.png',
        colors: ['#e5e5e5', '#b3c6f7', '#222'],
        description: 'Mỏng nhẹ, pin lâu, giá tốt.',
        price: 'Từ 24.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'Apple M2',
            ai: 'Apple Intelligence',
            camera: 'Camera FaceTime HD 1080p',
            cameraSystem: 'Camera True Tone',
            video: 'Lên đến 18 giờ',
        },
    },
    {
        name: 'iMac M3',
        image: '/public/Screenshot_2025-07-11_124324-removebg-preview.png',
        colors: ['#f5f5f5', '#222'],
        description: 'Tất cả trong một, màn hình lớn.',
        price: 'Từ 34.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'Apple M3',
            ai: 'Apple Intelligence',
            camera: 'Camera FaceTime HD 1080p',
            cameraSystem: 'Camera True Tone',
            video: 'Lên đến 18 giờ',
        },
    },
];

const MacPage = () => {
    const { model } = useParams();
    const data = macModels[model] || macModels["air"];

    return (
        <>
            <DeviceShowcase
                products={macVariants}
                title={data.name}
                desc={`Trải nghiệm ${data.name} đỉnh cao.`}
            />
            <div className="text-4xl ml-[330px] mt-20 font-bold">
                Tìm hiểu về {data.name}
            </div>
            <FeatureCarousel features={data.features} />
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <ProductList />
            </div>
            <WhyAppleSection />
            <ProductDetailComparison products={macProducts} />
            <Footer />
        </>
    );
};

export default MacPage; 