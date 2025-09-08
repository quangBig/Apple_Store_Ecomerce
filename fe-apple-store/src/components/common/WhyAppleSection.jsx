import React, { useMemo } from "react";
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { usePageProductStore } from "../../stores/usePageProduct";
import { useParams } from "react-router-dom";

const reasons = [
    {
        icon: <PaymentIcon fontSize="large" />,
        title: "Thanh toán hàng tháng dễ dàng",
        desc: "Hỗ trợ trả góp 0% lãi suất, linh hoạt nhiều ngân hàng.",
        ctaLink: "#"
    },

    {
        icon: <SchoolIcon fontSize="large" />,
        title: "Ưu đãi giáo dục hấp dẫn",
        desc: "Sinh viên, giáo viên mua sản phẩm Apple với giá ưu đãi đặc biệt.",
        ctaLink: "#"
    },
    {
        icon: <SettingsSuggestIcon fontSize="large" />,
        title: "Tùy chỉnh sản phẩm Apple của bạn",
        desc: "Chọn chip, bộ nhớ, dung lượng, màu sắc theo ý muốn.",
        ctaLink: "#"
    },
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: "Giao hàng miễn phí tận nơi",
        desc: "Giao hàng nhanh chóng, miễn phí trên toàn quốc.",
        ctaLink: "#"
    },
];

const WhyAppleSection = () => {

    const { pageProducts, loading } = usePageProductStore();
    const { slug } = useParams();
    const product = useMemo(
        () =>
            pageProducts.find(
                (p) => p.slug.replace(/^\//, "") === slug?.replace(/^\//, "")
            ),
        [pageProducts, slug]
    );
    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="text-3xl font-semibold ml-20 mt-10 whitespace-pre-line">
                <h1>
                    Vì sao Apple Store là nơi tốt nhất để mua sản phẩm {product.name}
                </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-10">


                <div className=" pb-4">
                    <ul className="flex md:grid md:grid-cols-4 gap-6 min-w-[700px] md:min-w-0">
                        {reasons.map((item, idx) => (
                            <li key={idx} className="flex-shrink-0 w-72 md:w-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                                <div className="h-14 mb-4 flex items-center justify-center">
                                    {typeof item.icon === 'string' ? (
                                        <img src={item.icon} alt="" className="h-14" />
                                    ) : (
                                        item.icon
                                    )}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 mb-4 text-sm">{item.desc}</p>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default WhyAppleSection; 