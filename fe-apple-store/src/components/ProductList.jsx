import React from "react";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

const products = [
    {
        name: "iPhone và Mac",
        des: "",
        image: "/Screenshot_2025-07-11_125755-removebg-preview.png",

    },
    {
        name: "iPhone và Apple Watch",
        des: "",
        image: "/Screenshot_2025-07-11_124324-removebg-preview.png",

    },
    {
        name: "iPhone và AirPods",
        des: "",
        image: "/Screenshot_2025-07-11_124602-removebg-preview.png",

    },
    {
        name: "iPhone và Ipad",
        des: "",
        image: "/Screenshot_2025-07-11_125944-removebg-preview.png",

    },
];

const ProductList = () => {
    return (
        <>
            <div>
                <div className=" text-4xl -ml-60 mt-20 font-bold "> Nửa kia hoàn hảo</div>
                <ProductGrid>
                    {products.map((product, idx) => (
                        <ProductCard key={idx} {...product} />
                    ))}
                </ProductGrid>
            </div>
        </>
    )
};

export default ProductList; 