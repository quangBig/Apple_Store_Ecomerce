import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

// fake data, sau này bạn fetch từ NestJS API
const banners = [
    {
        title: "iPhone 16 Pro",
        description: "Một iPhone cực đỉnh.",
        price: "Từ 28.471.000đ hoặc 1.159.000đ/tháng trong 24 tháng",
        href: "https://www.apple.com/vn/shop/buy-iphone/iphone-16-pro",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-16-pro-202409?wid=800&hei=1000&fmt=jpeg&qlt=90",
        dark: true,
    },
    {
        title: "ƯU ĐÃI TRONG THỜI GIAN CÓ HẠN",
        description:
            "Tiết kiệm khi mua Mac và iPad cho đại học, chọn AirPods hoặc một phụ kiện hợp lệ.",
        href: "/vn/shop/browse/home/education_routing",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-bts-offer-featured-202505_GEO_VN?wid=800&hei=1000&fmt=p-jpg&qlt=95",
        dark: false,
    },
    {
        title: "iPad Air",
        description: "Nhanh như bay",
        price: "Từ 16.689.000đ hoặc 680.000đ/tháng trong 24 tháng",
        href: "/vn/shop/buy-ipad/ipad-air",
        image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-ipad-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95",
        dark: false,
    },
    // ... add các banner khác
];

export default function CardShelfCarousel() {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        const scrollAmount = 400;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div data-aos="fade-up" className="relative w-full py-6">
            <div className="text-3xl font-semibold ml-20 mt-10 whitespace-pre-line">
                <h1>
                    Thế hệ mới nhất
                </h1>
            </div>
            {/* Header */}


            {/* Scroll buttons */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6 mt-5 ml-10"
            >
                {banners.map((b, i) => (
                    <a
                        key={i}
                        href={b.href}
                        className={`min-w-[300px] max-w-[400px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 ${b.dark ? "bg-black text-white" : "bg-gray-100 text-black"
                            }`}
                    >
                        <img
                            src={b.image}
                            alt={b.title}
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{b.title}</h3>
                            <p className="text-sm mt-2">{b.description}</p>
                            {b.price && (
                                <p className="text-base font-medium mt-2">{b.price}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
