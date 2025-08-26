import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProductStore } from "../../../stores/useProductStore";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from "../../../components/ui/alert-dialog";

const ProductManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { getProducts, products, createProduct, loading, updateProduct, deleteProduct } = useProductStore();
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    console.log(products);

    // Khởi tạo state cho sản phẩm mới
    const getInitialProductState = () => ({
        _id: "",
        name: "",  
        description: "",
        Outstandingfeatures: "",
        category: "",
        images: [""],
        variants: [
            {
                name: "",
                price: "",
                config: "",
                colors: [
                    { name: "", value: "", hex: "", image: "", price: "" }
                ]
            }
        ]
    });

    const [newProduct, setNewProduct] = useState(getInitialProductState());

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // Xử lý thay đổi thông tin cơ bản
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Upload ảnh
    const handleImageUpload = (index, file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedImages = [...newProduct.images];
            updatedImages[index] = reader.result;
            setNewProduct((prev) => ({ ...prev, images: updatedImages }));
        };
        reader.readAsDataURL(file);
    };

    // Xóa ảnh
    const removeImage = (index) => {
        setNewProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    // Xóa màu
    const removeColor = (variantIndex, colorIndex) => {
        const updatedVariants = [...newProduct.variants];
        updatedVariants[variantIndex].colors = updatedVariants[variantIndex].colors.filter(
            (_, i) => i !== colorIndex
        );
        setNewProduct((prev) => ({ ...prev, variants: updatedVariants }));
    };

    // Xóa phiên bản
    const removeVariant = (index) => {
        const updatedVariants = [...newProduct.variants];
        updatedVariants.splice(index, 1);
        setNewProduct((prev) => ({ ...prev, variants: updatedVariants }));
    };

    // Thêm ảnh mới
    const addImage = () => {
        setNewProduct((prev) => ({ ...prev, images: [...prev.images, ""] }));
    };

    // Cập nhật variant
    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...newProduct.variants];
        updatedVariants[index][field] = value;
        setNewProduct((prev) => ({ ...prev, variants: updatedVariants }));
    };

    // Cập nhật màu trong variant
    const handleColorChange = (variantIndex, colorIndex, field, value) => {
        const updatedVariants = [...newProduct.variants];
        updatedVariants[variantIndex].colors[colorIndex][field] = value;
        setNewProduct((prev) => ({ ...prev, variants: updatedVariants }));
    };

    // Thêm màu mới
    const addColor = (variantIndex) => {
        const updatedVariants = [...newProduct.variants];
        updatedVariants[variantIndex].colors.push({
            name: "",
            value: "",
            hex: "",
            image: "",
            price: ""
        });
        setNewProduct((prev) => ({ ...prev, variants: updatedVariants }));
    };

    // Thêm variant mới
    const addVariant = () => {
        setNewProduct((prev) => ({
            ...prev,
            variants: [...prev.variants, {
                name: "",
                price: "",
                config: "",
                colors: []
            }]
        }));
    };

    // Xử lý chỉnh sửa sản phẩm
    const handleEdit = (product) => {
        setNewProduct({
            ...product,
            images: product.images && product.images.length > 0 ? product.images : [""],
            variants: product.variants.map(variant => ({
                ...variant,
                colors: variant.colors || []
            }))
        });
        setIsEditing(true);
        setShowForm(true);
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await updateProduct(newProduct._id, newProduct);
            } else {
                await createProduct(newProduct);
            }

            await getProducts();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting product:", error);
        }
    };

    // Reset form về trạng thái ban đầu
    const resetForm = () => {
        setNewProduct(getInitialProductState());
        setIsEditing(false);
    };

    // Xử lý xóa sản phẩm
    const handleDelete = async () => {
        if (selectedId) {
            await deleteProduct(selectedId);
            setSelectedId(null);
            getProducts();
        }
    };


    // Đóng form và reset
    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };

    return (
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + Thêm sản phẩm
                </button>
            </div>

            {/* Phần tìm kiếm và bảng sản phẩm */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Hình ảnh</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Tên sản phẩm</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Danh mục</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Dung lượng</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Giá</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Màu sắc</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.filter((product) =>
                                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((product, index) => {
                                    const variants = product.variants || [];
                                    const allColors = variants.flatMap(variant => variant.colors || []);

                                    return (
                                        <tr key={index}>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={product.images?.[0] || '/placeholder-product.png'}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="font-medium">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.Outstandingfeatures}</div>
                                            </td>
                                            <td className="px-4 py-2 capitalize">{product.category}</td>
                                            <td className="px-4 py-2">
                                                <div className="space-y-1">
                                                    {variants.map((v, i) => (
                                                        <div key={i} className="text-sm">
                                                            {v.name} - {v.config}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="space-y-1">
                                                    {variants.map((v, i) => (
                                                        <div key={i} className="text-sm">
                                                            {Number(v.price).toLocaleString()}₫
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="space-y-1">
                                                    {allColors.map((color, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <span
                                                                className="inline-block w-4 h-4 rounded-full border border-gray-200"
                                                                style={{ backgroundColor: color.hex || '#e5e7eb' }}
                                                                title={`${color.name} (${color.value})`}
                                                            />
                                                            <span className="text-sm">{color.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    Sửa
                                                </button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button
                                                            className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                            onClick={() => setSelectedId(product._id)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Bạn có chắc chắn muốn xóa <b>{product.name}</b>?
                                                                Hành động này không thể hoàn tác.
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Form thêm/chỉnh sửa sản phẩm */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">
                                    {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                                </h3>
                                <button
                                    onClick={handleCloseForm}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Tên sản phẩm"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                    required
                                />
                                <textarea
                                    name="description"
                                    placeholder="Mô tả"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="Outstandingfeatures"
                                    placeholder="Tính năng nổi bật"
                                    value={newProduct.Outstandingfeatures}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Danh mục"
                                    value={newProduct.category}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />

                                {/* Hình ảnh */}
                                <div>
                                    <label className="font-semibold">Hình ảnh:</label>
                                    {newProduct.images.map((img, idx) => (
                                        <div key={idx} className="mt-2 flex items-center gap-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                                            />
                                            {img && (
                                                <img
                                                    src={img}
                                                    alt={`Ảnh ${idx + 1}`}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="text-red-500 font-bold"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addImage}
                                        className="mt-2 px-3 py-1 bg-gray-200 rounded"
                                    >
                                        + Thêm ảnh
                                    </button>
                                </div>

                                {/* Variants */}
                                {newProduct.variants.map((variant, vIdx) => (
                                    <div key={vIdx} className="border p-3 rounded-lg mt-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">Phiên bản {vIdx + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(vIdx)}
                                                className="text-red-500 font-bold"
                                            >
                                                X
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Tên"
                                            value={variant.name}
                                            onChange={(e) => handleVariantChange(vIdx, "name", e.target.value)}
                                            className="w-full border px-3 py-2 rounded-lg mt-1"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Giá"
                                            value={variant.price}
                                            onChange={(e) => handleVariantChange(vIdx, "price", e.target.value)}
                                            className="w-full border px-3 py-2 rounded-lg mt-1"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Cấu hình"
                                            value={variant.config}
                                            onChange={(e) => handleVariantChange(vIdx, "config", e.target.value)}
                                            className="w-full border px-3 py-2 rounded-lg mt-1"
                                        />

                                        {/* Colors */}
                                        <div className="mt-2">
                                            <label className="font-semibold">Màu sắc:</label>
                                            {variant.colors.map((color, cIdx) => (
                                                <div key={cIdx} className="grid grid-cols-6 gap-2 mt-1 items-center">
                                                    <input
                                                        type="text"
                                                        placeholder="Tên"
                                                        value={color.name}
                                                        onChange={(e) => handleColorChange(vIdx, cIdx, "name", e.target.value)}
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Value"
                                                        value={color.value}
                                                        onChange={(e) => handleColorChange(vIdx, cIdx, "value", e.target.value)}
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Hex"
                                                        value={color.hex}
                                                        onChange={(e) => handleColorChange(vIdx, cIdx, "hex", e.target.value)}
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    handleColorChange(vIdx, cIdx, "image", reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Giá"
                                                        value={color.price}
                                                        onChange={(e) => handleColorChange(vIdx, cIdx, "price", e.target.value)}
                                                        className="border px-2 py-1 rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeColor(vIdx, cIdx)}
                                                        className="text-red-500 font-bold"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => addColor(vIdx)}
                                                className="mt-2 px-3 py-1 bg-gray-200 rounded"
                                            >
                                                + Thêm màu
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="mt-4 px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    + Thêm phiên bản
                                </button>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseForm}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        disabled={loading}
                                    >
                                        {loading ? "Đang xử lý..." : "Lưu sản phẩm"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;