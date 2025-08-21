import React, { useState } from "react";

const PageManagement = () => {
    const [activeTab, setActiveTab] = useState("home");

    // State cho trang chủ (banner)
    const [banners, setBanners] = useState([]);
    const [form, setForm] = useState({
        title: "",
        decs: "",
        image: "",
        link: "",
        reverse: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddBanner = () => {
        if (!form.title || !form.decs || !form.image || !form.link) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        setBanners([...banners, form]);
        setForm({ title: "", decs: "", image: "", link: "", reverse: false });
    };

    return (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý trang</h2>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === "home" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("home")}
                >
                    Trang chủ
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("product")}
                >
                    Trang sản phẩm
                </button>
            </div>

            {/* Nội dung từng tab */}
            <div>
                {activeTab === "home" && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-6">Quản lý Trang chủ</h3>

                        {/* Form nhập banner */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea
                                    name="decs"
                                    rows="2"
                                    value={form.decs}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={form.link}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="reverse"
                                    checked={form.reverse}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-700">Đảo ngược vị trí (ảnh - chữ)</label>
                            </div>

                            <button
                                onClick={handleAddBanner}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Thêm Banner
                            </button>
                        </div>

                        {/* Danh sách banner */}
                        {banners.length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-md font-semibold mb-4">Danh sách Banner</h4>
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 border">Tiêu đề</th>
                                            <th className="px-4 py-2 border">Mô tả</th>
                                            <th className="px-4 py-2 border">Image</th>
                                            <th className="px-4 py-2 border">Link</th>
                                            <th className="px-4 py-2 border">Đảo ngược</th>
                                            <th className="px-4 py-2 border">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {banners.map((b, i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-2 border">{b.title}</td>
                                                <td className="px-4 py-2 border">{b.decs}</td>
                                                <td className="px-4 py-2 border">
                                                    <img src={b.image} alt="banner" className="h-12 rounded" />
                                                </td>
                                                <td className="px-4 py-2 border">{b.link}</td>
                                                <td className="px-4 py-2 border text-center">
                                                    {b.reverse ? "True" : "False"}
                                                </td>
                                                <td className="p-2 border space-x-2">
                                                    <button

                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button

                                                        className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "product" && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Quản lý Trang sản phẩm</h3>

                        {/* Danh mục sản phẩm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {[
                                { name: "iPhone", slug: "iphone", count: 15, icon: "📱", color: "blue" },
                                { name: "iPad", slug: "ipad", count: 8, icon: "📱", color: "purple" },
                                { name: "Mac", slug: "mac", count: 12, icon: "💻", color: "green" },
                            ].map((category, index) => (
                                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl
                                            ${category.color === "blue" ? "bg-blue-100 text-blue-600" :
                                                category.color === "purple" ? "bg-purple-100 text-purple-600" :
                                                    category.color === "green" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
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

                        {/* Form thêm danh mục */}
                        <h4 className="text-md font-semibold mb-4">Thêm danh mục mới</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" placeholder="Tên danh mục" className="px-3 py-2 border rounded-lg" />
                            <input type="text" placeholder="Slug" className="px-3 py-2 border rounded-lg" />
                            <select className="px-3 py-2 border rounded-lg">
                                <option>📱 Phone</option>
                                <option>💻 Laptop</option>
                                <option>⌚ Watch</option>
                                <option>🎧 Headphones</option>
                                <option>🔧 Accessories</option>
                            </select>
                            <select className="px-3 py-2 border rounded-lg">
                                <option value="blue">Xanh dương</option>
                                <option value="purple">Tím</option>
                                <option value="green">Xanh lá</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                Thêm danh mục
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageManagement;
