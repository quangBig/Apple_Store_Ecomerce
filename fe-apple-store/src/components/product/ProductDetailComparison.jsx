import React from "react";
import { Link } from "react-router-dom";
import MemoryIcon from '@mui/icons-material/Memory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CameraIcon from '@mui/icons-material/Camera';
import FiberPinIcon from '@mui/icons-material/FiberPin';

// Ví dụ icon tạm thời, có thể thay bằng icon SVG hoặc thư viện icon


const specLabels = [
    { key: <MemoryIcon />, label: "Chip" },
    { key: <PsychologyIcon />, label: "Apple Intelligence" },
    { key: <CameraIcon />, label: "Camera" },
    { key: <FiberPinIcon />, label: "Thời gian xem video" },
];

const ProductDetailComparison = ({ products }) => {
    return (
        <div className="w-full bg-[#fafafd] py-8 px-2 md:px-8">
            <div className="text-3xl font-semibold ml-20 mt-10 whitespace-pre-line">
                <h1>
                    Các sản phẩm tương tự
                </h1>
            </div>
            <div className="w-full flex justify-center mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center content-center">


                    {products.map((product, idx) => (
                        <div
                            key={product.name}
                            className="bg-white rounded-xl shadow p-4 flex flex-col items-center min-w-[220px] max-w-xs mx-0"
                            style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
                        >
                            <img
                                src={product.images}
                                alt={product.name}
                                className="w-24 h-40 object-contain mb-3"
                            />
                            {/* Dots màu */}
                            {product.colors && (
                                <div className="flex gap-1 mb-2">
                                    {product.colors.map((color, i) => (
                                        <span
                                            key={i}
                                            className="w-2 h-2 rounded-full border border-gray-200"
                                            style={{ background: color }}
                                        />
                                    ))}
                                </div>
                            )}
                            <h3 className="font-semibold text-lg mb-1 text-center">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-2 text-center">{product.description}</p>
                            <p className="text-black font-bold text-base mb-2 text-center">{product.price}</p>
                            <div className="flex gap-2 mb-4">
                                <Link
                                    to={"/product/macbook-pro-14-m4"}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium"
                                >
                                    Tìm hiểu thêm
                                </Link>
                            </div>
                            {/* Thông số kỹ thuật dạng dọc */}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailComparison; 