import { useEffect, useState } from "react";
import { usePageProductStore } from "../../stores/usePageProduct";

const products = [
    {
        name: "Mac",
        href: "/vn/shop/buy-mac",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202503?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "iPhone",
        href: "/vn/shop/buy-iphone",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202502?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "iPad",
        href: "/vn/shop/buy-ipad",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "Apple Watch",
        href: "/vn/shop/buy-watch",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202409?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "AirPods",
        href: "https://www.apple.com/vn/airpods",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airpods-nav-202409?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "AirTag",
        href: "/vn/shop/accessories/all/airtag",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "Apple TV 4K",
        href: "/vn/shop/tv",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha",
    },
    {
        name: "Phụ Kiện",
        href: "/vn/shop/accessories/all",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-accessories-nav-202503?wid=400&hei=260&fmt=png-alpha",
    },
];

export default function ProductCarousel() {
    const { pageProducts, getPageProducts } = usePageProductStore();;
    useEffect(() => {
        getPageProducts();
    }, [getPageProducts]);

    return (
        <div data-aos="fade-up" className="relative w-full">
            <div className="text-3xl font-semibold ml-20 mt-10 whitespace-pre-line">
                <h1>
                    Cửa Hàng. Cách tốt nhất để mua {"\n"}sản phẩm bạn thích.
                </h1>
            </div>

            <div
                id="carousel"
                className="flex space-x-4 overflow-x-auto ml-20 mt-5"
            >
                {pageProducts.map((p) => (
                    <a
                        key={p.name}
                        href={p.slug}
                        className="min-w-[160px] flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        <img
                            src={p.image}
                            alt={p.name}
                            className="w-[120px] h-[90px] object-contain rounded-xl"
                        />
                        <span className="mt-2 text-lg font-medium">{p.name}</span>
                    </a>
                ))}
            </div>

        </div>
    );
}
