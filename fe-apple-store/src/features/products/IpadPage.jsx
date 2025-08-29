import React from "react";
import DeviceShowcase from "../../components/sections/DeviceShowcase";
import FeatureCarousel from "../../components/common/FeatureCarousel";
import ProductConnect from "../../components/product/ProductConnect";
import WhyAppleSection from "../../components/common/WhyAppleSection";
import ProductDetailComparison from "../../components/product/ProductDetailComparison";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router-dom";
import VideoProduct from "../../components/common/VideoProduct";

const ipadModels = {
    "pro": {
        name: "iPad Pro",
        features: [
            {
                product: "iPad Pro",
                image: '/ipadpro-silver.png',
                subtitle: 'Màn Hình',
                title: 'Liquid Retina XDR',
                description: 'Trải nghiệm hình ảnh sắc nét, sống động.',
                bg: 'bg-purple-50'
            },
            {
                product: "iPad Pro",
                image: '/ipadpro-gray.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip Apple M2',
                description: 'Xử lý mượt mà mọi tác vụ.',
                bg: 'bg-gray-100'
            },
            {
                product: "iPad Pro",
                image: '/OIP.webp',
                subtitle: 'Apple Pencil',
                title: 'Sáng tạo không giới hạn',
                description: 'Hỗ trợ Apple Pencil và Magic Keyboard.',
                bg: 'bg-yellow-50'
            },
        ]
    },
    "air": {
        name: "iPad Air",
        features: [
            {
                product: "iPad Air",
                image: '/ipadpro-silver.png',
                subtitle: 'Màn Hình',
                title: 'Liquid Retina',
                description: 'Mỏng nhẹ, hình ảnh sắc nét.',
                bg: 'bg-purple-50'
            },
            {
                product: "iPad Air",
                image: '/ipadpro-gray.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip Apple M2',
                description: 'Xử lý mượt mà mọi tác vụ.',
                bg: 'bg-gray-100'
            },
            {
                product: "iPad Air",
                image: '/OIP.webp',
                subtitle: 'Apple Pencil',
                title: 'Sáng tạo không giới hạn',
                description: 'Hỗ trợ Apple Pencil.',
                bg: 'bg-yellow-50'
            },
        ]
    },
    "mini": {
        name: "iPad mini",
        features: [
            {
                product: "iPad mini",
                image: '/ipadpro-silver.png',
                subtitle: 'Nhỏ gọn',
                title: 'Dễ mang theo',
                description: 'Thiết kế nhỏ gọn, tiện lợi.',
                bg: 'bg-purple-50'
            },
            {
                product: "iPad mini",
                image: '/ipadpro-gray.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip A15 Bionic',
                description: 'Mạnh mẽ, tiết kiệm pin.',
                bg: 'bg-gray-100'
            },
            {
                product: "iPad mini",
                image: '/OIP.webp',
                subtitle: 'Apple Pencil',
                title: 'Sáng tạo không giới hạn',
                description: 'Hỗ trợ Apple Pencil.',
                bg: 'bg-yellow-50'
            },
        ]
    },
    "ipad": {
        name: "iPad",
        features: [
            {
                product: "iPad",
                image: '/ipadpro-silver.png',
                subtitle: 'Màn Hình',
                title: 'Retina',
                description: 'Hình ảnh sắc nét, sống động.',
                bg: 'bg-purple-50'
            },
            {
                product: "iPad",
                image: '/ipadpro-gray.png',
                subtitle: 'Hiệu Năng',
                title: 'Chip A14 Bionic',
                description: 'Xử lý mượt mà mọi tác vụ.',
                bg: 'bg-gray-100'
            },
            {
                product: "iPad",
                image: '/OIP.webp',
                subtitle: 'Apple Pencil',
                title: 'Sáng tạo không giới hạn',
                description: 'Hỗ trợ Apple Pencil.',
                bg: 'bg-yellow-50'
            },
        ]
    },
};

const ipadVariants = [
    {
        color: "#f5f5f7",
        name: "iPad Pro Bạc",
        image: "/Screenshot_2025-07-15_162832-removebg-preview.png",
        bg: "bg-white",
        text: "text-black",
        desc: "iPad Pro. Sức mạnh từ chip Apple M2.",
        btn: "border-black text-black hover:bg-black hover:text-white",
    },
    {
        color: "#64748b",
        name: "iPad Pro Xám Không Gian",
        image: "/ipadpro-gray.png",
        bg: "bg-slate-500",
        text: "text-white",
        desc: "iPad Pro. Trải nghiệm iPad đỉnh cao nhất.",
        btn: "border-white text-white hover:bg-white hover:text-slate-500",
    },
];

const ipadProducts = [
    {
        name: 'iPad Pro M4',
        image: '/public/Screenshot_2025-07-11_124324-removebg-preview.png',
        colors: ['#e5e5e5', '#222'],
        description: 'Mạnh mẽ nhất, màn hình đẹp nhất.',
        price: 'Từ 28.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'Apple M4',
            ai: 'Apple Intelligence',
            camera: 'Camera Pro 12MP',
            cameraSystem: 'Camera LiDAR, Ultra Wide',
            video: 'Lên đến 10 giờ',
        },
    },
    {
        name: 'iPad Air M2',
        image: '/public/Screenshot_2025-07-11_124602-removebg-preview.png',
        colors: ['#b3c6f7', '#e5e5e5', '#222'],
        description: 'Mỏng nhẹ, mạnh mẽ, nhiều màu sắc.',
        price: 'Từ 16.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'Apple M2',
            ai: 'Apple Intelligence',
            camera: 'Camera 12MP',
            cameraSystem: 'Camera Ultra Wide',
            video: 'Lên đến 10 giờ',
        },
    },
    {
        name: 'iPad 10th',
        image: '/public/Screenshot_2025-07-11_125755-removebg-preview.png',
        colors: ['#f5f5f5', '#222'],
        description: 'Giá tốt, đủ dùng cho mọi nhu cầu.',
        price: 'Từ 10.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'A14 Bionic',
            ai: '—',
            camera: 'Camera 12MP',
            cameraSystem: 'Camera Ultra Wide',
            video: 'Lên đến 10 giờ',
        },
    },
];

const IpadPage = () => {
    const { model } = useParams();
    const data = ipadModels[model] || ipadModels["pro"];

    return (
        <div>
            <DeviceShowcase
                products={ipadVariants}
                title={data.name}
                desc={`Chiếc ${data.name} tiên tiến nhất từ trước đến nay.`}
            />
            <VideoProduct />
            <div className="text-4xl ml-[330px] mt-20 font-bold">
                Tìm hiểu về {data.name}
            </div>
            <FeatureCarousel features={data.features} />
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <ProductConnect />
            </div>
            <WhyAppleSection />
            <ProductDetailComparison products={ipadProducts} />
            <Footer />
        </div>
    );
};

export default IpadPage; 