import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro",
            price: 29990000,
            originalPrice: 32990000,
            image: "/Screenshot_2025-07-10_174131-removebg-preview.png",
            quantity: 1,
            category: "iPhone"
        },
        {
            id: 2,
            name: "MacBook Air M2",
            price: 27990000,
            originalPrice: 29990000,
            image: "/Screenshot_2025-07-10_174701-removebg-preview.png",
            quantity: 2,
            category: "Mac"
        },
        {
            id: 3,
            name: "iPad Pro 2022",
            price: 22990000,
            originalPrice: 24990000,
            image: "/Screenshot_2025-07-10_174346-removebg-preview.png",
            quantity: 1,
            category: "iPad"
        }
    ]);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100
        });
    }, []);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateDiscount = () => {
        return cartItems.reduce((total, item) => {
            const originalTotal = item.originalPrice * item.quantity;
            const currentTotal = item.price * item.quantity;
            return total + (originalTotal - currentTotal);
        }, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + 50000; // Phí vận chuyển
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center" data-aos="fade-up">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🛒</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
                        <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <Link
                            to="/"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">
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
                                <span className="text-gray-500">Giỏ hàng</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" data-aos="fade-up">Giỏ hàng</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4" data-aos="fade-right" data-aos-delay="200">
                        {cartItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                                data-aos="fade-up"
                                data-aos-delay={300 + index * 100}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-contain rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg font-bold text-green-600">{formatPrice(item.price)}₫</span>
                                                    {item.originalPrice > item.price && (
                                                        <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}₫</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-2 border-x border-gray-300 bg-white font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Tổng tiền sản phẩm:</span>
                                                <span className="font-semibold">{formatPrice(item.price * item.quantity)}₫</span>
                                            </div>
                                            {item.originalPrice > item.price && (
                                                <div className="flex justify-between text-sm text-green-600 mt-1">
                                                    <span>Tiết kiệm:</span>
                                                    <span>{formatPrice((item.originalPrice - item.price) * item.quantity)}₫</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1" data-aos="fade-left" data-aos-delay="400">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                                    <span>{formatPrice(calculateSubtotal())}₫</span>
                                </div>

                                {calculateDiscount() > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Giảm giá:</span>
                                        <span>-{formatPrice(calculateDiscount())}₫</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển:</span>
                                    <span>50,000₫</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Tổng cộng:</span>
                                        <span>{formatPrice(calculateTotal())}₫</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Link to="/checkout">
                                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                        Tiến hành thanh toán
                                    </button></Link>
                                <Link
                                    to="/"
                                    className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                                >
                                    Tiếp tục mua sắm
                                </Link>
                            </div>

                            {/* Promo Code */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Mã giảm giá</h3>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16" data-aos="fade-up" data-aos-delay="600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "AirPods Pro", price: "5,990,000", image: "/Screenshot_2025-07-10_174457-removebg-preview.png" },
                            { name: "Apple Watch", price: "8,990,000", image: "/Screenshot_2025-07-10_174554-removebg-preview.png" },
                            { name: "iPhone 15", price: "24,990,000", image: "/OIP.webp" },
                            { name: "MacBook Pro", price: "35,990,000", image: "/OIP-removebg-preview.png" }
                        ].map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                                data-aos="zoom-in"
                                data-aos-delay={700 + index * 100}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-32 object-contain mb-4"
                                />
                                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-green-600 font-bold mb-3">{product.price}₫</p>
                                <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-200 text-sm">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CartPage; 