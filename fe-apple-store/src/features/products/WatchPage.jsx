import React from "react";

import { useParams } from "react-router-dom";
import DeviceShowcase from "../../components/sections/DeviceShowcase";
import FeatureCarousel from "../../components/common/FeatureCarousel";
import ProductList from "../../components/product/ProductList";
import WhyAppleSection from "../../components/common/WhyAppleSection";
import ProductDetailComparison from "../../components/product/ProductDetailComparison";
import Footer from "../../components/layout/Footer";

const watchModels = {
    "se": {
        name: "Apple Watch SE",
        features: [
            {
                product: "Apple Watch SE",
                image: '/applewatch-black.png',
                subtitle: 'Sức Khỏe',
                title: 'Theo dõi sức khỏe cơ bản',
                description: 'Đo nhịp tim, tập luyện, giá tốt.',
                bg: 'bg-gray-100'
            },
            {
                product: "Apple Watch SE",
                image: '/applewatch-gold.png',
                subtitle: 'Thiết Kế',
                title: 'Nhẹ, nhiều màu',
                description: 'Dây đeo thời trang, nhiều lựa chọn.',
                bg: 'bg-yellow-50'
            },
            {
                product: "Apple Watch SE",
                image: '/OIP (1).webp',
                subtitle: 'Pin',
                title: 'Pin lâu',
                description: 'Sử dụng cả ngày dài.',
                bg: 'bg-blue-50'
            },
        ]
    },
    "series9": {
        name: "Apple Watch Series 9",
        features: [
            {
                product: "Apple Watch Series 9",
                image: '/applewatch-black.png',
                subtitle: 'Sức Khỏe',
                title: 'Theo dõi sức khỏe toàn diện',
                description: 'Đo nhịp tim, oxy, tập luyện mọi lúc.',
                bg: 'bg-gray-100'
            },
            {
                product: "Apple Watch Series 9",
                image: '/applewatch-gold.png',
                subtitle: 'Thiết Kế',
                title: 'Sang trọng, cá tính',
                description: 'Nhiều màu sắc, dây đeo thời trang.',
                bg: 'bg-yellow-50'
            },
            {
                product: "Apple Watch Series 9",
                image: '/OIP (1).webp',
                subtitle: 'Pin',
                title: 'Thời lượng pin lâu',
                description: 'Sử dụng cả ngày dài.',
                bg: 'bg-blue-50'
            },
        ]
    },
    "ultra2": {
        name: "Apple Watch Ultra 2",
        features: [
            {
                product: "Apple Watch Ultra 2",
                image: '/applewatch-black.png',
                subtitle: 'Bền bỉ',
                title: 'Chịu nước, chịu va đập',
                description: 'Thiết kế cho thể thao chuyên nghiệp.',
                bg: 'bg-gray-100'
            },
            {
                product: "Apple Watch Ultra 2",
                image: '/applewatch-gold.png',
                subtitle: 'Thiết Kế',
                title: 'Cứng cáp, mạnh mẽ',
                description: 'Khung titan, dây đeo chuyên dụng.',
                bg: 'bg-yellow-50'
            },
            {
                product: "Apple Watch Ultra 2",
                image: '/OIP (1).webp',
                subtitle: 'Pin',
                title: 'Pin cực lâu',
                description: 'Lên đến 36 giờ sử dụng.',
                bg: 'bg-blue-50'
            },
        ]
    },
};

const watchVariants = [
    {
        color: "#111827",
        name: "Apple Watch Đen",
        image: "/Screenshot_2025-07-15_162702-removebg-preview.png",
        bg: "bg-gray-900",
        text: "text-white",
        desc: "Apple Watch Series 9. Thông minh hơn. Sáng hơn. Mạnh mẽ hơn.",
        btn: "border-white text-white hover:bg-white hover:text-gray-900",
    },
    {
        color: "#fbbf24",
        name: "Apple Watch Vàng",
        image: "/applewatch-gold.png",
        bg: "bg-yellow-300",
        text: "text-black",
        desc: "Apple Watch. Tương lai của sức khỏe trên cổ tay bạn.",
        btn: "border-black text-black hover:bg-black hover:text-yellow-300",
    },
];

const watchProducts = [
    {
        name: 'Apple Watch Ultra 2',
        image: '/public/Screenshot_2025-07-10_174701-removebg-preview.png',
        colors: ['#e5e5e5', '#222'],
        description: 'Bền bỉ, chuyên nghiệp, pin lâu.',
        price: 'Từ 21.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'S9 SiP',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 36 giờ',
        },
    },
    {
        name: 'Apple Watch Series 9',
        image: '/public/Screenshot_2025-07-10_174346-removebg-preview.png',
        colors: ['#b3c6f7', '#e5e5e5', '#222'],
        description: 'Đầy đủ tính năng sức khỏe, giá tốt.',
        price: 'Từ 10.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'S9 SiP',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 18 giờ',
        },
    },
    {
        name: 'Apple Watch SE',
        image: '/public/Screenshot_2025-07-10_174457-removebg-preview.png',
        colors: ['#f5f5f5', '#222'],
        description: 'Giá rẻ, đủ tính năng cơ bản.',
        price: 'Từ 6.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'S8 SiP',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 18 giờ',
        },
    },
];

const WatchPage = () => {
    const { model } = useParams();
    const data = watchModels[model] || watchModels["series9"];

    return (
        <>
            <DeviceShowcase
                products={watchVariants}
                title={data.name}
                desc={`Chiếc ${data.name} tiên tiến nhất từ trước đến nay.`}
            />
            <div className="text-4xl ml-[330px] mt-20 font-bold">
                Tìm hiểu về {data.name}
            </div>
            <FeatureCarousel features={data.features} />
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <ProductList />
            </div>
            <WhyAppleSection />
            <ProductDetailComparison products={watchProducts} />
            <Footer />
        </>
    );
};

export default WatchPage; 