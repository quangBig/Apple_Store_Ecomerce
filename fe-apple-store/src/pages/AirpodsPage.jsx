import React from "react";
import DeviceShowcase from "../components/DeviceShowcase";
import ProductList from "../components/ProductList";
import WhyAppleSection from "../components/WhyAppleSection";
import Footer from "../components/Footer";
import ProductDetailComparison from '../components/ProductDetailComparison';
import FeatureCarousel from '../components/FeatureCarousel';
import { useParams } from "react-router-dom";

const airpodsModels = {
    "airpods": {
        name: "AirPods",
        features: [
            {
                product: "AirPods",
                image: '/OIP-removebg-preview.png',
                subtitle: 'Âm Thanh',
                title: 'Chất lượng cao',
                description: 'Trải nghiệm âm thanh sống động, chân thực.',
                bg: 'bg-gray-100'
            },
            {
                product: "AirPods",
                image: '/0029796_tim-removebg-preview.png',
                subtitle: 'Thiết Kế',
                title: 'Thoải mái, thời trang',
                description: 'Thiết kế ôm sát, phù hợp mọi hoạt động.',
                bg: 'bg-blue-50'
            },
            {
                product: "AirPods",
                image: '/0029805_dem-xanh-tham_550-removebg-preview.png',
                subtitle: 'Pin',
                title: 'Nghe nhạc cả ngày',
                description: 'Thời lượng pin vượt trội.',
                bg: 'bg-green-50'
            },
        ]
    },
    "airpods-pro": {
        name: "AirPods Pro",
        features: [
            {
                product: "AirPods Pro",
                image: '/OIP-removebg-preview.png',
                subtitle: 'Chống ồn',
                title: 'Chống ồn chủ động',
                description: 'Loại bỏ tiếng ồn hiệu quả.',
                bg: 'bg-gray-100'
            },
            {
                product: "AirPods Pro",
                image: '/0029796_tim-removebg-preview.png',
                subtitle: 'Chất lượng âm thanh',
                title: 'Âm thanh vượt trội',
                description: 'Âm bass mạnh mẽ, chi tiết.',
                bg: 'bg-blue-50'
            },
            {
                product: "AirPods Pro",
                image: '/0029805_dem-xanh-tham_550-removebg-preview.png',
                subtitle: 'Pin',
                title: 'Nghe nhạc cả ngày',
                description: 'Thời lượng pin vượt trội.',
                bg: 'bg-green-50'
            },
        ]
    },
    "airpods-max": {
        name: "AirPods Max",
        features: [
            {
                product: "AirPods Max",
                image: '/OIP-removebg-preview.png',
                subtitle: 'Chất lượng âm thanh',
                title: 'Âm thanh Hi-Fi',
                description: 'Trải nghiệm âm thanh cao cấp.',
                bg: 'bg-gray-100'
            },
            {
                product: "AirPods Max",
                image: '/0029796_tim-removebg-preview.png',
                subtitle: 'Thiết kế',
                title: 'Sang trọng, thoải mái',
                description: 'Chụp tai êm ái, khung nhôm cao cấp.',
                bg: 'bg-blue-50'
            },
            {
                product: "AirPods Max",
                image: '/0029805_dem-xanh-tham_550-removebg-preview.png',
                subtitle: 'Pin',
                title: 'Pin lâu',
                description: 'Nghe nhạc cả ngày dài.',
                bg: 'bg-green-50'
            },
        ]
    },
};

const airpodsVariants = [
    {
        color: "#f5f5f7",
        name: "AirPods Max Trắng",
        image: "/OIP-removebg-preview.png",
        bg: "bg-white",
        text: "text-black",
        desc: "Cân bằng hoàn hảo giữa âm thanh chất lượng cao và sự kỳ diệu của AirPods.",
        btn: "border-black text-black hover:bg-black hover:text-white",
    },
    {
        color: "#e5e7eb",
        name: "AirPods Max Xám",
        image: "/0029796_tim-removebg-preview.png",
        bg: "bg-gray-100",
        text: "text-gray-900",
        desc: "Cân bằng hoàn hảo giữa âm thanh chất lượng cao và sự kỳ diệu của AirPods.",
        btn: "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    },
    {
        color: "#2a3138",
        name: "AirPods Max Đen",
        image: "/0029805_dem-xanh-tham_550-removebg-preview.png",
        bg: "bg-black",
        text: "text-white",
        desc: "Cân bằng hoàn hảo giữa âm thanh chất lượng cao và sự kỳ diệu của AirPods.",
        btn: "border-white text-white hover:bg-white hover:text-black",
    },
];

const airpodsProducts = [
    {
        name: 'AirPods Pro (Gen 2)',
        image: '/public/0029805_dem-xanh-tham_550-removebg-preview.png',
        colors: ['#e5e5e5', '#222'],
        description: 'Chống ồn chủ động, âm thanh vượt trội.',
        price: 'Từ 5.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'H2',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 6 giờ nghe nhạc',
        },
    },
    {
        name: 'AirPods 3',
        image: '/public/0029796_tim-removebg-preview.png',
        colors: ['#e5e5e5', '#222'],
        description: 'Thiết kế mới, âm thanh không gian.',
        price: 'Từ 4.490.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'H1',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 6 giờ nghe nhạc',
        },
    },
    {
        name: 'AirPods 2',
        image: '/public/0029796_tim.jpeg',
        colors: ['#e5e5e5', '#222'],
        description: 'Giá rẻ, kết nối nhanh.',
        price: 'Từ 2.990.000đ',
        detailUrl: '#',
        buyUrl: '#',
        specs: {
            chip: 'H1',
            ai: '—',
            camera: '—',
            cameraSystem: '—',
            video: 'Lên đến 5 giờ nghe nhạc',
        },
    },
];

const AirpodsPage = () => {
    const { model } = useParams();
    const data = airpodsModels[model] || airpodsModels["airpods"];

    return (
        <div>
            <DeviceShowcase
                products={airpodsVariants}
                title={data.name}
                desc={`Cân bằng hoàn hảo giữa âm thanh chất lượng cao và sự kỳ diệu của ${data.name}.`}
            />
            <div className="text-4xl ml-[330px] mt-20 font-bold">
                Tìm hiểu về {data.name}
            </div>
            <FeatureCarousel features={data.features} />
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <ProductList />
            </div>
            <WhyAppleSection />
            <ProductDetailComparison products={airpodsProducts} />
            <Footer />
        </div>
    );
};

export default AirpodsPage; 