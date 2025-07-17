import React from "react";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

// Mock data sản phẩm tương tự
const products = [
    {
        name: "iPhone",
        image: "/Screenshot_2025-07-10_174131-removebg-preview.png",
        link: "/iphone"
    },
    {
        name: "MacBook",
        image: "/Screenshot_2025-07-10_174701-removebg-preview.png",
        link: "/mac"
    },
    {
        name: "iPad",
        image: "/Screenshot_2025-07-10_174346-removebg-preview.png",
        link: "/ipad"
    },
    {
        name: "AirPods",
        image: "/Screenshot_2025-07-10_174457-removebg-preview.png",
        link: "/airpods"
    },
    {
        name: "Watch",
        image: "/Screenshot_2025-07-10_174554-removebg-preview.png",
        link: "/watch"
    }
];

const OtherProducts = ({ excludeId }) => {
    // Lọc bỏ sản phẩm hiện tại nếu cần
    const filtered = excludeId ? products.filter(p => p.productId !== excludeId) : products;
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8" data-aos="fade-up">Các dòng sản phẩm khác của Apple</h2>
            <ProductGrid>
                {filtered.map((p, idx) => (
                    <div data-aos="zoom-in" data-aos-delay={idx * 100} key={p.productId || idx}>
                        <ProductCard {...p} />
                    </div>
                ))}
            </ProductGrid>
        </div>
    );
};

export default OtherProducts; 