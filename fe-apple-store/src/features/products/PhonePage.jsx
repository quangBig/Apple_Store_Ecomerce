import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import DeviceShowcase from "../../components/sections/DeviceShowcase";
import FeatureCarousel from "../../components/common/FeatureCarousel";
import ProductConnect from "../../components/product/ProductConnect";
import WhyAppleSection from "../../components/common/WhyAppleSection";
import ProductDetailComparison from "../../components/product/ProductDetailComparison";
import Footer from "../../components/layout/Footer";
import { useProductStore } from "../../stores/useProductStore";
import VideoProduct from "../../components/common/VideoProduct";

// const iphoneModels = {
//     "15pro": {
//         name: "iPhone 15 Pro",
//         features: [
//             {
//                 product: "iPhone 15 Pro",
//                 image: '/public/Screenshot_2025-07-10_174131-removebg-preview.png',
//                 subtitle: 'Camera Tiên Tiến',
//                 title: 'Ghi lại những chuyển động đẹp nhất',
//                 description: 'Ghi lại những chuyển động đẹp nhất trong video và ảnh chụp.',
//                 bg: 'bg-blue-100'
//             },
//             {
//                 product: "iPhone 15 Pro",
//                 image: '/public/OIP-removebg-preview.png',
//                 subtitle: 'Chip & Thời Lượng Pin',
//                 title: 'Nhanh. Nhanh dài lâu.',
//                 description: 'Chip A18 Pro mạnh mẽ, pin bền bỉ.',
//                 bg: 'bg-yellow-100'
//             },
//             {
//                 product: "iPhone 15 Pro",
//                 image: '/public/Screenshot_2025-07-10_174554-removebg-preview.png',
//                 subtitle: 'Apple Intelligence',
//                 title: 'Khai mở tiềm năng mạnh mẽ',
//                 description: 'Trí tuệ nhân tạo hỗ trợ mọi tác vụ.',
//                 bg: 'bg-black text-white'
//             },
//         ]
//     },
//     "15": {
//         name: "iPhone 15",
//         features: [
//             {
//                 product: "iPhone 15",
//                 image: '/public/Screenshot_2025-07-10_174346-removebg-preview.png',
//                 subtitle: 'Camera',
//                 title: 'Chụp ảnh sắc nét',
//                 description: 'Camera kép 48MP, chụp đêm tốt.',
//                 bg: 'bg-pink-100'
//             },
//             {
//                 product: "iPhone 15",
//                 image: '/public/OIP-removebg-preview.png',
//                 subtitle: 'Hiệu Năng',
//                 title: 'Chip A16 Bionic',
//                 description: 'Mạnh mẽ, tiết kiệm pin.',
//                 bg: 'bg-green-100'
//             },
//             {
//                 product: "iPhone 15",
//                 image: '/public/Screenshot_2025-07-10_174554-removebg-preview.png',
//                 subtitle: 'Thiết Kế',
//                 title: 'Màu sắc trẻ trung',
//                 description: 'Nhiều màu mới, viền bo cong.',
//                 bg: 'bg-blue-50'
//             },
//         ]
//     },
//     "15plus": {
//         name: "iPhone 15 Plus",
//         features: [
//             {
//                 product: "iPhone 15 Plus",
//                 image: '/public/Screenshot_2025-07-10_174346-removebg-preview.png',
//                 subtitle: 'Màn hình lớn',
//                 title: 'Trải nghiệm rộng rãi',
//                 description: 'Màn hình lớn hơn, pin lâu hơn.',
//                 bg: 'bg-purple-100'
//             },
//             {
//                 product: "iPhone 15 Plus",
//                 image: '/public/OIP-removebg-preview.png',
//                 subtitle: 'Hiệu Năng',
//                 title: 'Chip A16 Bionic',
//                 description: 'Mạnh mẽ, tiết kiệm pin.',
//                 bg: 'bg-green-100'
//             },
//             {
//                 product: "iPhone 15 Plus",
//                 image: '/public/Screenshot_2025-07-10_174554-removebg-preview.png',
//                 subtitle: 'Thiết Kế',
//                 title: 'Màu sắc trẻ trung',
//                 description: 'Nhiều màu mới, viền bo cong.',
//                 bg: 'bg-blue-50'
//             },
//         ]
//     },
//     "15promax": {
//         name: "iPhone 15 Pro Max",
//         features: [
//             {
//                 product: "iPhone 15 Pro Max",
//                 image: '/public/Screenshot_2025-07-10_174131-removebg-preview.png',
//                 subtitle: 'Camera Đỉnh Cao',
//                 title: 'Zoom quang học 5x',
//                 description: 'Camera tele mạnh mẽ nhất trên iPhone.',
//                 bg: 'bg-orange-100'
//             },
//             {
//                 product: "iPhone 15 Pro Max",
//                 image: '/public/OIP-removebg-preview.png',
//                 subtitle: 'Hiệu Năng',
//                 title: 'Chip A18 Pro',
//                 description: 'Mạnh mẽ, tiết kiệm pin.',
//                 bg: 'bg-yellow-100'
//             },
//             {
//                 product: "iPhone 15 Pro Max",
//                 image: '/public/Screenshot_2025-07-10_174554-removebg-preview.png',
//                 subtitle: 'Màn hình lớn',
//                 title: 'Trải nghiệm điện ảnh',
//                 description: 'Màn hình lớn nhất, trải nghiệm tốt nhất.',
//                 bg: 'bg-blue-50'
//             },
//         ]
//     },
// };

// const phoneVariants = [
//     {
//         color: "#f5f5f7",
//         name: "iPhone 15 Pro Trắng",
//         image: "/Screenshot_2025-07-15_162049-removebg-preview.png",
//         bg: "bg-yellow",
//         text: "text-black",
//         desc: "iPhone 15 Pro. Titanium. Siêu bền. Siêu nhẹ. Siêu Pro.",
//         btn: "border-black text-black hover:bg-black hover:text-white",
//     },
//     {
//         color: "#1e293b",
//         name: "iPhone 15 Pro Xanh",
//         image: "/iphone15pro-blue.png",
//         bg: "bg-slate-900",
//         text: "text-white",
//         desc: "iPhone 15 Pro. Chiếc iPhone mạnh mẽ nhất từ trước đến nay.",
//         btn: "border-white text-white hover:bg-white hover:text-black",
//     },
//     {
//         color: "#e11d48",
//         name: "iPhone 15 Pro Đỏ",
//         image: "/iphone15pro-red.png",
//         bg: "bg-red-600",
//         text: "text-white",
//         desc: "iPhone 15 Pro. Màu sắc mới nổi bật.",
//         btn: "border-white text-white hover:bg-white hover:text-red-600",
//     },
// ];

// const phoneProducts = [
//     {
//         name: 'iPhone 16 Pro',
//         image: '/public/Screenshot_2025-07-10_174131-removebg-preview.png',
//         colors: ['#e5cfc2', '#d6d6d6', '#222'],
//         description: 'Một iPhone cực đỉnh.',
//         price: 'Từ 28.471.000đ hoặc 1.159.000đ/th.\ntrong 24 tháng*',
//         detailUrl: '#',
//         buyUrl: '#',
//         specs: {
//             chip: 'Chip A18 Pro với GPU 6 lõi',
//             ai: 'Được thiết kế cho Apple Intelligence*',
//             camera: 'Siêu Khủng Camera',
//             cameraSystem: 'Hệ thống camera chuyên nghiệp\nCamera Fusion 48MP siêu tính năng chụp chân trời\nCamera Telephoto 8X',
//             video: 'Thời gian xem video lên đến 29 giờ',
//         },
//     },
//     {
//         name: 'iPhone 16',
//         image: '/public/Screenshot_2025-07-10_174346-removebg-preview.png',
//         colors: ['#b3c6f7', '#e5e5e5', '#222'],
//         description: 'Một thiết bị siêu mạnh mẽ.',
//         price: 'Từ 22.580.000đ hoặc 919.000đ/th.\ntrong 24 tháng*',
//         detailUrl: '#',
//         buyUrl: '#',
//         specs: {
//             chip: 'Chip A18 với GPU 6 lõi',
//             ai: 'Được thiết kế cho Apple Intelligence*',
//             camera: 'Siêu Khủng Camera',
//             cameraSystem: 'Hệ thống camera kép tiên tiến\nCamera Fusion 48MP\nTelephoto 2X',
//             video: 'Thời gian xem video lên đến 27 giờ',
//         },
//     },
//     {
//         name: 'iPhone 16e',
//         image: '/public/Screenshot_2025-07-10_174457-removebg-preview.png',
//         colors: ['#f5f5f5', '#222'],
//         description: 'iPhone mới nhất với giá tốt nhất.',
//         price: 'Từ 16.889.000đ hoặc 680.000đ/th.\ntrong 24 tháng*',
//         detailUrl: '#',
//         buyUrl: '#',
//         specs: {
//             chip: 'Chip A18 với GPU 4 lõi',
//             ai: 'Được thiết kế cho Apple Intelligence*',
//             camera: 'Siêu Khủng Camera',
//             cameraSystem: 'Hệ thống camera 2 trong 1\nCamera Fusion 48MP',
//             video: 'Thời gian xem video lên đến 20 giờ',
//         },
//     },
//     {
//         name: 'iPhone 15',
//         image: '/public/Screenshot_2025-07-10_174554-removebg-preview.png',
//         colors: ['#f8d6e0', '#e5e5e5', '#222'],
//         description: 'Luôn tuyệt vời như thế.',
//         price: 'Từ 19.635.000đ hoặc 799.000đ/th.\ntrong 24 tháng*',
//         detailUrl: '#',
//         buyUrl: '#',
//         specs: {
//             chip: 'Chip A16 Bionic với GPU 5 lõi',
//             ai: '—',
//             camera: 'Hệ thống camera kép',
//             cameraSystem: 'Camera Chính 48MP\nTelephoto 2X\nCamera Ultra Wide',
//             video: 'Thời gian xem video lên đến 20 giờ',
//         },
//     },
// ];

const PhonePage = () => {
    const { model } = useParams();
    const { products, getProductById, getProducts } = useProductStore();

    const iphoneProducts = products.filter(p => p.category === "iPhone");

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div>
            <DeviceShowcase
                products={iphoneProducts}
                title={iphoneProducts.name}
                desc={`Trải nghiệm ${iphoneProducts.name} đỉnh cao.`}
            />
            <VideoProduct />
            <div className="text-4xl ml-[330px] mt-20 font-bold">
                Tìm hiểu về {iphoneProducts.name}
            </div>
            <FeatureCarousel features={iphoneProducts.features} />
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <ProductConnect />
            </div>
            <WhyAppleSection />
            <ProductDetailComparison products={iphoneProducts} />
            <Footer />
        </div>
    );
};

export default PhonePage; 