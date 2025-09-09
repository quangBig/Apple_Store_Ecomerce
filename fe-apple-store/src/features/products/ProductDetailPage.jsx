import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import OtherProducts from "../../components/sections/OtherProducts";
import { useProductStore } from "../../stores/useProductStore";

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { products } = useProductStore();

    // Hooks luôn nằm trên cùng
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100,
        });
    }, []);

    // Tìm sản phẩm từ store (hoặc fallback mockData nếu chưa fetch xong)
    const product = products.find((p) => p._id === productId);

    if (!product) {
        return (
            <div className="w-full min-h-screen bg-white text-black">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-2xl font-bold mb-4">
                            Sản phẩm không tồn tại hoặc đang được cập nhật!
                        </h1>
                        <Link to="/" className="text-blue-600 hover:underline">
                            Quay về trang chủ
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const variant = product.variants?.[selectedVariant];
    const color = variant?.colors?.[selectedColor];
    const displayPrice = color?.price || variant?.price || product.price || "Đang cập nhật";

    const handleAddToCart = () => {
        alert(`Đã thêm ${quantity} ${product.name} (${variant?.name}, ${color?.name}) vào giỏ hàng!`);
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
                                <Link
                                    to={`/${product.category.toLowerCase()}`}
                                    className="text-gray-700 hover:text-gray-900"
                                >
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
                                src={color?.image || product.images?.[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex space-x-2" data-aos="fade-up" data-aos-delay="400">
                            {product.images?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${selectedImage === index
                                        ? "border-blue-500 shadow-lg"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
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
                                <span className="text-3xl font-bold text-green-600 animate-pulse">
                                    {displayPrice}₫
                                </span>
                            </div>
                        </div>

                        {/* Variant Selection */}
                        {product.variants && product.variants.length > 0 && (
                            <div data-aos="fade-up" data-aos-delay="450">
                                <h3 className="text-lg font-semibold mb-3">Phiên bản</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v, idx) => (
                                        <button
                                            key={v._id || idx}
                                            onClick={() => {
                                                setSelectedVariant(idx);
                                                setSelectedColor(0);
                                            }}
                                            className={`block border-2 rounded-lg p-3 min-w-[180px] text-left transition-all duration-300 ${selectedVariant === idx
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="font-semibold mb-1">{v.name}</div>
                                            <div className="text-xs text-gray-500 mb-1">{v.config}</div>
                                            <div className="text-sm font-bold">{v.price}₫</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {variant?.colors && (
                            <div data-aos="fade-up" data-aos-delay="500">
                                <h3 className="text-lg font-semibold mb-3">Màu sắc</h3>
                                <div className="flex flex-wrap gap-3">
                                    {variant.colors.map((c, idx) => (
                                        <button
                                            key={c.value}
                                            onClick={() => setSelectedColor(idx)}
                                            className={`flex flex-col items-center border-2 rounded-lg p-3 min-w-[120px] transition-all duration-300 ${selectedColor === idx
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <img src={c.image} alt={c.name} className="w-10 h-10 mb-2 rounded" />
                                            <span className="font-medium text-gray-700 mb-1">{c.name}</span>
                                            <span className="text-xs">{c.price}₫</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity + Buy Buttons */}
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
                                    <span className="px-4 py-2 border-x border-gray-300 bg-white font-medium">
                                        {quantity}
                                    </span>
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

                        {/* Description */}
                        <div data-aos="fade-up" data-aos-delay="700">
                            <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>


                            <div className="mt-8" data-aos="fade-up" data-aos-delay="800">
                                <h2 className="text-2xl font-bold text-center mb-8">Tính năng nổi bật</h2>
                                <div className="bg-gradient-to-br from-pink-200 to-orange-100 rounded-xl p-6 shadow-md">
                                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                        {product?.Outstandingfeatures
                                            ? product.Outstandingfeatures.split(',').map((feature, index) => (
                                                <li key={index}>{feature.trim()}</li>
                                            ))
                                            : <li>Đang tải tính năng...</li>
                                        }
                                    </ul>
                                </div>
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
