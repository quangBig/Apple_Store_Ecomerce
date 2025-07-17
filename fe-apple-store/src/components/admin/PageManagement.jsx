import React from "react";

const PageManagement = () => {
    return (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý trang</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    + Thêm trang mới
                </button>
            </div>

            {/* Page Categories */}
            <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-lg font-semibold mb-6">Danh mục trang</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "iPhone", slug: "iphone", count: 15, icon: "📱", color: "blue" },
                        { name: "iPad", slug: "ipad", count: 8, icon: "📱", color: "purple" },
                        { name: "Mac", slug: "mac", count: 12, icon: "💻", color: "green" },
                        { name: "Watch", slug: "watch", count: 6, icon: "⌚", color: "red" },
                        { name: "AirPods", slug: "airpods", count: 4, icon: "🎧", color: "yellow" },
                        { name: "Accessories", slug: "accessories", count: 20, icon: "🔧", color: "gray" }
                    ].map((category, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                            data-aos="zoom-in"
                            data-aos-delay={500 + index * 100}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${category.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        category.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            category.color === 'green' ? 'bg-green-100 text-green-600' :
                                                category.color === 'red' ? 'bg-red-100 text-red-600' :
                                                    category.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                    {category.icon}
                                </div>
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">Sửa</button>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Xóa</button>
                                </div>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">/{category.slug}</p>
                            <p className="text-sm text-gray-600">{category.count} sản phẩm</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add New Category */}
            <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="600">
                <h3 className="text-lg font-semibold mb-6">Thêm danh mục mới</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục</label>
                        <input
                            type="text"
                            placeholder="Ví dụ: iPhone, iPad, Mac..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                        <input
                            type="text"
                            placeholder="Ví dụ: iphone, ipad, mac..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="📱">📱 Phone</option>
                            <option value="💻">💻 Laptop</option>
                            <option value="⌚">⌚ Watch</option>
                            <option value="🎧">🎧 Headphones</option>
                            <option value="🔧">🔧 Accessories</option>
                            <option value="📱">📱 Tablet</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="blue">Xanh dương</option>
                            <option value="purple">Tím</option>
                            <option value="green">Xanh lá</option>
                            <option value="red">Đỏ</option>
                            <option value="yellow">Vàng</option>
                            <option value="gray">Xám</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                        Thêm danh mục
                    </button>
                </div>
            </div>

            {/* Page Templates */}
            <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="700">
                <h3 className="text-lg font-semibold mb-6">Mẫu trang</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">📱</span>
                            <h4 className="font-semibold">Trang sản phẩm</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Hiển thị danh sách sản phẩm với filter và search</p>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Xem trước</button>
                            <button className="text-green-600 hover:text-green-800 text-sm">Sử dụng</button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">🏠</span>
                            <h4 className="font-semibold">Trang chủ</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Trang chủ với hero section và sản phẩm nổi bật</p>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Xem trước</button>
                            <button className="text-green-600 hover:text-green-800 text-sm">Sử dụng</button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">ℹ️</span>
                            <h4 className="font-semibold">Trang thông tin</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Trang giới thiệu, liên hệ, về chúng tôi</p>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Xem trước</button>
                            <button className="text-green-600 hover:text-green-800 text-sm">Sử dụng</button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">📝</span>
                            <h4 className="font-semibold">Trang tùy chỉnh</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Tạo trang với nội dung tùy chỉnh</p>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Tạo mới</button>
                            <button className="text-green-600 hover:text-green-800 text-sm">Sử dụng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Settings */}
            <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="800">
                <h3 className="text-lg font-semibold mb-6">Cài đặt trang</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">Tùy chọn hiển thị</h4>
                        <div className="space-y-3">
                            {[
                                "Hiển thị breadcrumb",
                                "Hiển thị sidebar filter",
                                "Hiển thị pagination",
                                "Hiển thị sản phẩm liên quan",
                                "Hiển thị đánh giá sản phẩm"
                            ].map((setting, index) => (
                                <label key={index} className="flex items-center">
                                    <input type="checkbox" defaultChecked={index < 3} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-700">{setting}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">Cấu hình SEO</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Meta title mặc định</label>
                                <input type="text" defaultValue="AppleStore - {category}" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Meta description mặc định</label>
                                <textarea rows="3" defaultValue="Khám phá các sản phẩm {category} chất lượng cao tại AppleStore" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Lưu cài đặt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageManagement; 