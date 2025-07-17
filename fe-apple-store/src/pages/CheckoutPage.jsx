import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        paymentMethod: "cod",
        note: ""
    });

    const [orderItems] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro",
            price: 29990000,
            quantity: 1,
            image: "/Screenshot_2025-07-10_174131-removebg-preview.png"
        },
        {
            id: 2,
            name: "MacBook Air M2",
            price: 27990000,
            quantity: 2,
            image: "/Screenshot_2025-07-10_174701-removebg-preview.png"
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateSubtotal = () => {
        return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + 50000; // Phí vận chuyển
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý thanh toán
        alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 text-black">
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
                                <Link to="/cart" className="text-gray-700 hover:text-gray-900">
                                    Giỏ hàng
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-500">Thanh toán</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" data-aos="fade-up">Thanh toán</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8" data-aos="fade-right" data-aos-delay="200">
                        {/* Customer Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin khách hàng</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên đệm *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập họ và tên đệm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tên *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tên"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="example@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0123456789"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Địa chỉ giao hàng</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Địa chỉ chi tiết *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Số nhà, tên đường, phường/xã"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quận/Huyện *
                                        </label>
                                        <select
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            <option value="district1">Quận 1</option>
                                            <option value="district2">Quận 2</option>
                                            <option value="district3">Quận 3</option>
                                            <option value="district7">Quận 7</option>
                                            <option value="thuduc">Thành phố Thủ Đức</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tỉnh/Thành phố *
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Chọn tỉnh/thành phố</option>
                                            <option value="hcm">TP. Hồ Chí Minh</option>
                                            <option value="hn">Hà Nội</option>
                                            <option value="dn">Đà Nẵng</option>
                                            <option value="ct">Cần Thơ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Phương thức thanh toán</h2>

                            <div className="space-y-4">
                                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-4">
                                        <div className="flex items-center">
                                            <span className="text-lg mr-3">💳</span>
                                            <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Thanh toán bằng tiền mặt khi nhận hàng</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={formData.paymentMethod === "bank"}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-4">
                                        <div className="flex items-center">
                                            <span className="text-lg mr-3">🏦</span>
                                            <span className="font-medium">Chuyển khoản ngân hàng</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Chuyển khoản qua tài khoản ngân hàng</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="momo"
                                        checked={formData.paymentMethod === "momo"}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-4">
                                        <div className="flex items-center">
                                            <span className="text-lg mr-3">📱</span>
                                            <span className="font-medium">Ví MoMo</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Thanh toán qua ví điện tử MoMo</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Order Notes */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Ghi chú đơn hàng</h2>

                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ghi chú về đơn hàng (không bắt buộc)"
                            ></textarea>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1" data-aos="fade-left" data-aos-delay="400">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                            {/* Order Items */}
                            <div className="space-y-4 mb-6">
                                {orderItems.map((item, index) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-contain rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                            <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}₫</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Summary */}
                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính:</span>
                                    <span>{formatPrice(calculateSubtotal())}₫</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển:</span>
                                    <span>50,000₫</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Tổng cộng:</span>
                                        <span>{formatPrice(calculateTotal())}₫</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg mt-6"
                            >
                                Đặt hàng ngay
                            </button>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Bằng cách đặt hàng, bạn đồng ý với <Link to="/terms" className="text-blue-600 hover:underline">Điều khoản sử dụng</Link> và <Link to="/privacy" className="text-blue-600 hover:underline">Chính sách bảo mật</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage; 