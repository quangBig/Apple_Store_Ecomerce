import React, { useEffect, useState } from "react";
import { usePageStore } from "../../../stores/usePageStore";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
} from "../../../components/ui/alert-dialog";

// State ban đầu cho banner
const getInitialPageState = () => ({
    title: "",
    decs: "",
    image: "",
    link: "",
    reverse: false,
});

const PageManagement = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [form, setForm] = useState(getInitialPageState);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { pages, createPage, getPages, deletePage, updatePage } = usePageStore();

    // Fetch pages khi load
    useEffect(() => {
        getPages();
    }, [getPages]);

    // Xử lý input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Upload ảnh
    const handleImageUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && selectedId) {
                await updatePage(selectedId, form);
                toast.success("Cập nhật banner thành công");
            } else {
                await createPage(form);
                toast.success("Thêm banner thành công");
            }

            resetForm();
        } catch (error) {
            toast.error("Lỗi khi lưu trang: " + error.message);
        }
    };

    // Reset form
    const resetForm = () => {
        setForm(getInitialPageState());
        setImagePreview(null);
        setSelectedId(null);
        setIsEditing(false);
    };

    // Edit
    const handleEdit = (page) => {
        setForm({
            title: page.title,
            decs: page.decs,
            image: page.image,
            link: page.link,
            reverse: page.reverse,
        });
        setImagePreview(page.image);
        setSelectedId(page._id);
        setIsEditing(true);
    };

    // Delete
    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await deletePage(selectedId);
            toast.success("Xóa thành công");
            setSelectedId(null);
        } catch (error) {
            toast.error("Xóa trang thất bại: " + error.message);
        }
    };

    return (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý trang</h2>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b">
                {["home", "product"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium ${activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "home" ? "Trang chủ" : "Trang sản phẩm"}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {activeTab === "home" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-6">Quản lý Trang chủ</h3>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input label="Tiêu đề" name="title" value={form.title} onChange={handleChange} />
                        <Textarea label="Mô tả" name="decs" value={form.decs} onChange={handleChange} />

                        {/* Upload ảnh */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chọn ảnh từ máy
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="preview"
                                        className="h-40 rounded-lg border shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <Input label="Link" name="link" value={form.link} onChange={handleChange} />

                        {/* Reverse checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="reverse"
                                checked={form.reverse}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Đảo ngược vị trí (ảnh - chữ)
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                {isEditing ? "Cập nhật Banner" : "Thêm Banner"}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Hủy
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Danh sách banner */}
                    {pages.length > 0 && (
                        <div className="mt-8">
                            <h4 className="text-md font-semibold mb-4">Danh sách Banner</h4>
                            <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">Tiêu đề</th>
                                        <th className="px-4 py-2 border">Mô tả</th>
                                        <th className="px-4 py-2 border">Ảnh</th>
                                        <th className="px-4 py-2 border">Link</th>
                                        <th className="px-4 py-2 border">Đảo ngược</th>
                                        <th className="px-4 py-2 border">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page) => (
                                        <tr key={page._id}>
                                            <td className="px-4 py-2 border">{page.title}</td>
                                            <td className="px-4 py-2 border">{page.decs}</td>
                                            <td className="px-4 py-2 border">
                                                <img
                                                    src={page.image}
                                                    alt="banner"
                                                    className="h-12 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2 border">{page.link}</td>
                                            <td className="px-4 py-2 border text-center">
                                                {page.reverse ? "True" : "False"}
                                            </td>
                                            <td className="p-2 border space-x-2">
                                                <button
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                    onClick={() => handleEdit(page)}
                                                >
                                                    Sửa
                                                </button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button
                                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                            onClick={() => setSelectedId(page._id)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Xóa banner?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Bạn có chắc chắn muốn xóa{" "}
                                                                <b>{page.title}</b>? Hành động này không thể
                                                                hoàn tác.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                            <AlertDialogAction onClick={handleDelete}>
                                                                Xóa
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
    );
};

export default PageManagement;

/* ==== COMPONENT REUSABLE ==== */
const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <textarea
            {...props}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
    </div>
);
