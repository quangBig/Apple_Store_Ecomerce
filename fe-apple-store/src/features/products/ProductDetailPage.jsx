import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import OtherProducts from "../../components/sections/OtherProducts";

// Mock data - trong thực tế sẽ lấy từ API
const productData = {
    "macbook-pro-14-m4": {
        id: "macbook-pro-14-m4",
        name: "MacBook Pro 14 M4",
        description: "MacBook Pro 14 M4 trang bị chip M4 mạnh mẽ, RAM lớn, SSD tốc độ cao, màn hình 14.2 inch 3.5K, phù hợp cho công việc chuyên nghiệp.",
        category: "MacBook",
        images: [
            "/mac-m4-main.png",
            "/mac-m4-keyboard.png",
            "/mac-m4-side.png"
        ],
        variants: [
            {
                id: "10cpu-10gpu-24gb-1tb",
                name: "10CPU - 10GPU 24GB - 1TB",
                price: "49,990,000",
                config: "Apple M4 | 10 nhân GPU | 24GB | 1TB | 14.2'' 3.5K",
                colors: [
                    {
                        name: "Bạc",
                        value: "silver",
                        hex: "#E3E3E3",
                        image: "/mac-m4-silver.png",
                        price: "49,990,000"
                    },
                    {
                        name: "Đen",
                        value: "black",
                        hex: "#1D1D1F",
                        image: "/mac-m4-black.png",
                        price: "49,990,000"
                    }
                ]
            },
            {
                id: "10cpu-10gpu-16gb-1tb",
                name: "10CPU - 10GPU 16GB - 1TB",
                price: "45,990,000",
                config: "Apple M4 | 10 nhân GPU | 16GB | 1TB | 14.2'' 3.5K",
                colors: [
                    {
                        name: "Bạc",
                        value: "silver",
                        hex: "#E3E3E3",
                        image: "/mac-m4-silver.png",
                        price: "45,990,000"
                    },
                    {
                        name: "Đen",
                        value: "black",
                        hex: "#1D1D1F",
                        image: "/mac-m4-black.png",
                        price: "45,990,000"
                    }
                ]
            },
            {
                id: "10cpu-10gpu-16gb-512gb",
                name: "10CPU - 10GPU 16GB - 512GB",
                price: "41,990,000",
                config: "Apple M4 | 10 nhân GPU | 16GB | 512GB | 14.2'' 3.5K",
                colors: [
                    {
                        name: "Bạc",
                        value: "silver",
                        hex: "#E3E3E3",
                        image: "/mac-m4-silver.png",
                        price: "41,990,000"
                    },
                    {
                        name: "Đen",
                        value: "black",
                        hex: "#1D1D1F",
                        image: "/mac-m4-black.png",
                        price: "41,990,000"
                    }
                ]
            }
        ]
    },
    "iphone-15-pro": {
        id: "iphone-15-pro",
        name: "iPhone 15 Pro",
        price: "29,990,000",
        originalPrice: "32,990,000",
        images: [
            "/Screenshot_2025-07-10_174131-removebg-preview.png",
            "/OIP.webp",
            "/OIP-removebg-preview.png"
        ],
        description: "iPhone 15 Pro với chip A17 Pro mạnh mẽ, camera 48MP, màn hình Super Retina XDR 6.1 inch. Thiết kế titanium cao cấp, hỗ trợ 5G và MagSafe.",
        specs: {
            "Màn hình": "6.1 inch Super Retina XDR",
            "Chip": "A17 Pro",
            "Camera": "48MP + 12MP + 12MP",
            "Pin": "Lên đến 23 giờ video",
            "Màu sắc": "Titan tự nhiên, Titan xanh, Titan trắng, Titan đen"
        },
        category: "iPhone",
        colors: [
            { name: "Titan tự nhiên", value: "natural", hex: "#E3C5A8" },
            { name: "Titan xanh", value: "blue", hex: "#4A5D7C" },
            { name: "Titan trắng", value: "white", hex: "#F5F5F7" },
            { name: "Titan đen", value: "black", hex: "#1D1D1F" }
        ],
        storage: [
            { size: "128GB", price: "29,990,000" },
            { size: "256GB", price: "32,990,000" },
            { size: "512GB", price: "38,990,000" },
            { size: "1TB", price: "44,990,000" }
        ],
        ram: [
            { size: "8GB", price: "0" }
        ]
    },
    "macbook-air-m2": {
        id: "macbook-air-m2",
        name: "MacBook Air M2",
        price: "27,990,000",
        originalPrice: "29,990,000",
        images: [
            "/Screenshot_2025-07-10_174701-removebg-preview.png",
            "/OIP.webp",
            "/OIP-removebg-preview.png"
        ],
        description: "MacBook Air với chip M2 mạnh mẽ, màn hình Liquid Retina 13.6 inch, thời lượng pin lên đến 18 giờ. Thiết kế mỏng nhẹ, hoàn hảo cho công việc và giải trí.",
        specs: {
            "Màn hình": "13.6 inch Liquid Retina",
            "Chip": "Apple M2",
            "RAM": "8GB Unified Memory",
            "Lưu trữ": "256GB SSD",
            "Pin": "Lên đến 18 giờ"
        },
        category: "Mac",
        colors: [
            { name: "Bạc", value: "silver", hex: "#E3E3E3" },
            { name: "Xám không gian", value: "space-gray", hex: "#8E8E93" },
            { name: "Vàng starlight", value: "starlight", hex: "#F5E6D3" },
            { name: "Xanh midnight", value: "midnight", hex: "#1E1E1E" }
        ],
        storage: [
            { size: "256GB", price: "27,990,000" },
            { size: "512GB", price: "32,990,000" },
            { size: "1TB", price: "37,990,000" },
            { size: "2TB", price: "42,990,000" }
        ],
        ram: [
            { size: "8GB", price: "0" },
            { size: "16GB", price: "4,000,000" },
            { size: "24GB", price: "8,000,000" }
        ]
    },
    "ipad-pro-2022": {
        id: "ipad-pro-2022",
        name: "iPad Pro 2022",
        price: "22,990,000",
        originalPrice: "24,990,000",
        images: [
            "/Screenshot_2025-07-10_174346-removebg-preview.png",
            "/OIP.webp",
            "/OIP-removebg-preview.png"
        ],
        description: "iPad Pro với chip M2, màn hình Liquid Retina XDR 12.9 inch, hỗ trợ Apple Pencil và Magic Keyboard. Hiệu suất mạnh mẽ cho công việc chuyên nghiệp.",
        specs: {
            "Màn hình": "12.9 inch Liquid Retina XDR",
            "Chip": "Apple M2",
            "Camera": "12MP + 10MP + LiDAR Scanner",
            "Lưu trữ": "128GB",
            "Hỗ trợ": "Apple Pencil, Magic Keyboard"
        },
        category: "iPad",
        colors: [
            { name: "Bạc", value: "silver", hex: "#F2F2F7" },
            { name: "Xám không gian", value: "space-gray", hex: "#8E8E93" }
        ],
        storage: [
            { size: "128GB", price: "22,990,000" },
            { size: "256GB", price: "25,990,000" },
            { size: "512GB", price: "30,990,000" },
            { size: "1TB", price: "35,990,000" },
            { size: "2TB", price: "40,990,000" }
        ],
        ram: [
            { size: "8GB", price: "0" },
            { size: "16GB", price: "3,000,000" }
        ]
    }
};

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100
        });
    }, []);

    const product = productData[productId];
    if (!product || !product.variants || product.variants.length === 0) {
        // fallback UI
        return (
            <div className="w-full min-h-screen bg-white text-black">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại hoặc chưa có cấu hình!</h1>
                        <Link to="/" className="text-blue-600 hover:underline">
                            Quay về trang chủ
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const variant = product.variants[selectedVariant] || product.variants[0];
    const color = (variant.colors && variant.colors[selectedColor]) || (variant.colors && variant.colors[0]);
    const displayPrice = color?.price || variant?.price || product.price || "Đang cập nhật";

    const handleAddToCart = () => {
        alert(`Đã thêm ${quantity} ${product.name} (${variant.name}, ${color.name}) vào giỏ hàng!`);
    };

    return (
        <div className="w-full min-h-screen bg-white text-black">
            <Header />
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4" data-aos="fade-down">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-700 hover:text-gray-900">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <Link to={`/${product.category.toLowerCase()}`} className="text-gray-700 hover:text-gray-900">
                                    {product.category}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-500">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4" data-aos="fade-right" data-aos-delay="200">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <img
                                src={color?.image || product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex space-x-2" data-aos="fade-up" data-aos-delay="400">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Product Info */}
                    <div className="space-y-6" data-aos="fade-left" data-aos-delay="300">
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold text-green-600 animate-pulse">{displayPrice}₫</span>
                            </div>
                        </div>
                        {/* Variant Selection */}
                        <div data-aos="fade-up" data-aos-delay="450">
                            <h3 className="text-lg font-semibold mb-3">Phiên bản</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((v, idx) => (
                                    <button
                                        key={v.id}
                                        onClick={() => { setSelectedVariant(idx); setSelectedColor(0); }}
                                        className={`block border-2 rounded-lg p-3 min-w-[180px] text-left transition-all duration-300 ${selectedVariant === idx ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="font-semibold mb-1">{v.name}</div>
                                        <div className="text-xs text-gray-500 mb-1">{v.config}</div>
                                        <div className="text-sm font-bold">{v.price}₫</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Color Selection */}
                        <div data-aos="fade-up" data-aos-delay="500">
                            <h3 className="text-lg font-semibold mb-3">Màu sắc</h3>
                            <div className="flex flex-wrap gap-3">
                                {variant.colors.map((c, idx) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setSelectedColor(idx)}
                                        className={`flex flex-col items-center border-2 rounded-lg p-3 min-w-[120px] transition-all duration-300 ${selectedColor === idx ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img src={c.image} alt={c.name} className="w-10 h-10 mb-2 rounded" />
                                        <span className="font-medium text-gray-700 mb-1">{c.name}</span>
                                        <span className="text-xs">{c.price}₫</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Số lượng và nút mua */}
                        <div className="space-y-4" data-aos="fade-up" data-aos-delay="600">
                            <div className="flex items-center space-x-4">
                                <label className="font-medium">Số lượng:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x border-gray-300 bg-white font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        {/* Mô tả và tính năng nổi bật */}
                        <div data-aos="fade-up" data-aos-delay="700">
                            <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="mt-8" data-aos="fade-up" data-aos-delay="800">
                            <h2 className="text-2xl font-bold text-center mb-8">Tính năng nổi bật</h2>
                            <div className="bg-gradient-to-br from-pink-200 to-orange-100 rounded-xl p-6 shadow-md">
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Trang bị chip M4 mạnh mẽ với 10 nhân CPU và 10 nhân GPU, xử lý đa nhiệm mượt mà và hiệu quả.</li>
                                    <li>RAM dung lượng lớn, giúp đa nhiệm trơn tru, xử lý nhiều ứng dụng chuyên nghiệp cùng lúc mà không bị giật lag.</li>
                                    <li>Ổ cứng SSD dung lượng lớn, cho phép lưu trữ thoải mái dữ liệu, ứng dụng và các dự án cá nhân.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OtherProducts excludeId={productId} />
            <Footer />
        </div>
    );
};

export default ProductDetailPage; 