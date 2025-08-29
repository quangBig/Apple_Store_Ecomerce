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
import { usePageProductStore } from "../../../stores/usePageProduct";

/* ==== STATE ==== */
const getInitialPageState = () => ({
    title: "",
    desc: "",   // ✅ sửa decs -> desc
    image: "",
    link: "",
    reverse: false,
});

const getInitialProductState = () => ({
    name: "",
    slug: "",
    image: "",
});

const PageManagement = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [form, setForm] = useState(getInitialPageState);
    const [productForm, setProductForm] = useState(getInitialProductState);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const { pages, createPage, getPages, deletePage, updatePage, reorderPages } = usePageStore();
    const { pageProducts, getPageProducts, createPageProduct, deletePageProduct, updatePageProduct } = usePageProductStore();

    useEffect(() => {
        getPageProducts();
    }, [getPageProducts]);

    useEffect(() => {
        getPages();
    }, [getPages]);
    console.log("pages", pages);

    /* ==== FORM HANDLERS ==== */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductImageUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setProductForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    /* ==== SUBMIT ==== */
    const handleSubmitPageHome = async (e) => {
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

    const handleSubmitPageProduct = async (e) => {
        e.preventDefault();
        try {
            if (isEditingProduct && selectedProductId) {
                await updatePageProduct(selectedProductId, productForm);
                toast.success("Cập nhật danh mục thành công");
            } else {
                await createPageProduct(productForm);
                toast.success("Thêm danh mục thành công");
            }

            setProductForm(getInitialProductState());
            setImagePreview(null);
            setIsEditingProduct(false);
            setSelectedProductId(null);
        } catch (error) {
            toast.error("Lỗi khi lưu danh mục: " + error.message);
        }
    };

    /* ==== RESET ==== */
    const resetForm = () => {
        setForm(getInitialPageState());
        setImagePreview(null);
        setSelectedId(null);
        setIsEditing(false);
    };

    /* ==== EDIT ==== */
    const handleEdit = (page) => {
        setForm({
            title: page.title,
            desc: page.desc,   // ✅ dùng desc
            image: page.image,
            link: page.link,
            reverse: page.reverse,
        });
        setImagePreview(page.image);
        setSelectedId(page._id);
        setIsEditing(true);
    };

    const handleEditProduct = (product) => {
        setProductForm({
            name: product.name,
            slug: product.slug,
            image: product.image,
        });
        setImagePreview(product.image);
        setSelectedProductId(product._id);
        setIsEditingProduct(true);
    };

    /* ==== DELETE ==== */
    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await deletePage(selectedId);
            toast.success("Xóa banner thành công");
            setSelectedId(null);
        } catch (error) {
            toast.error("Xóa trang thất bại: " + error.message);
        }
    };

    const handleDeleteProduct = async () => {
        if (!selectedId) return;
        try {
            await deletePageProduct(selectedId);
            toast.success("Xóa danh mục thành công");
            setSelectedId(null);
        } catch (error) {
            toast.error("Xóa danh mục thất bại: " + error.message);
        }
    };

    /* ==== REORDER ==== */
    const moveUp = async (index) => {
        if (index === 0) return;
        const newPages = [...pages];
        [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];

        const newOrder = newPages.map((p, idx) => ({
            id: p._id,
            position: idx + 1,
        }));

        await reorderPages(newOrder);
    };

    const moveDown = async (index) => {
        if (index === pages.length - 1) return;
        const newPages = [...pages];
        [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];

        const newOrder = newPages.map((p, idx) => ({
            id: p._id,
            position: idx + 1,
        }));

        await reorderPages(newOrder);
    };


    /* ==== UI ==== */
    return (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
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
                    <form className="space-y-4" onSubmit={handleSubmitPageHome}>
                        <Input label="Tiêu đề" name="title" value={form.title} onChange={handleChange} />
                        <Textarea label="Mô tả" name="desc" value={form.desc} onChange={handleChange} />

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
                                        <th className="px-4 py-2 border">Sắp xếp</th>
                                        <th className="px-4 py-2 border">Tiêu đề</th>
                                        <th className="px-4 py-2 border">Mô tả</th>
                                        <th className="px-4 py-2 border">Ảnh</th>
                                        <th className="px-4 py-2 border">Link</th>
                                        <th className="px-4 py-2 border">Đảo ngược</th>
                                        <th className="px-4 py-2 border">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page, index) => (
                                        <tr key={page._id}>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() => moveUp(index)}
                                                    className="px-2 py-1 bg-gray-200 rounded mr-1"
                                                >
                                                    ⬆
                                                </button>
                                                <button
                                                    onClick={() => moveDown(index)}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    ⬇
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border">{page.title}</td>
                                            <td className="px-4 py-2 border">{page.desc}</td>
                                            <td className="px-4 py-2 border">
                                                <img src={page.image} alt="banner" className="h-12 rounded" />
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
                        {pageProducts.map((pP, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-2xl">
                                        <img src={pP.image} alt="banner" className="h-12 rounded" />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                            onClick={() => handleEditProduct(pP)}
                                        >
                                            Sửa
                                        </button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                    onClick={() => setSelectedId(pP._id)}
                                                >
                                                    Xóa
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Xóa danh mục?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Bạn có chắc chắn muốn xóa{" "}
                                                        <b>{pP.name}</b>? Hành động này không thể
                                                        hoàn tác.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDeleteProduct}>
                                                        Xóa
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">{pP.name}</h4>
                                <p className="text-sm text-gray-500 mb-2">{pP.slug}</p>
                            </div>
                        ))}
                    </div>

                    {/* Form thêm danh mục */}
                    <form onSubmit={handleSubmitPageProduct} className="space-y-4 mb-6">
                        <h4 className="text-md font-semibold mb-4">
                            {isEditingProduct ? "Cập nhật danh mục" : "Thêm danh mục mới"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input
                                type="text"
                                name="name"
                                value={productForm.name}
                                onChange={handleProductChange}
                                placeholder="Tên danh mục"
                                className="px-3 py-2 border rounded-lg"
                            />
                            <input
                                type="text"
                                name="slug"
                                value={productForm.slug}
                                onChange={handleProductChange}
                                placeholder="Slug (đường dẫn)"
                                className="px-3 py-2 border rounded-lg"
                            />
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleProductImageUpload(e.target.files[0])}
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
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                                type="submit"
                            >
                                {isEditingProduct ? "Cập nhật danh mục" : "Thêm danh mục"}
                            </button>
                            {isEditingProduct && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProductForm(getInitialProductState());
                                        setImagePreview(null);
                                        setIsEditingProduct(false);
                                        setSelectedProductId(null);
                                    }}
                                    className="ml-3 bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Hủy
                                </button>
                            )}
                        </div>
                    </form>
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
