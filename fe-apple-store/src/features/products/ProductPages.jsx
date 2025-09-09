import { useParams } from "react-router-dom";
import { useProductStore } from "../../stores/useProductStore";
import DeviceShowcase from "../../components/sections/DeviceShowcase";
import Footer from "../../components/layout/Footer";
import WhyAppleSection from "../../components/common/WhyAppleSection";
import ProductDetailComparison from "../../components/product/ProductDetailComparison";
import VideoProduct from "../../components/common/VideoProduct";
import FeatureCarousel from "../../components/common/FeatureCarousel";
import ProductConnect from "../../components/product/ProductConnect";

const ProductPages = () => {
    const { slug } = useParams();
    const { products } = useProductStore();

    // tìm product theo slug
    const productBySlug = products.find((p) => p.category.toLowerCase() === slug.toLowerCase());

    if (!productBySlug) {
        return <h2 className="text-center mt-20">Không tìm thấy sản phẩm cho "{slug}"</h2>;
    }

    // map variants.colors thành "products" cho DeviceShowcase
    const showcaseProducts = productBySlug.variants[0].colors.map((c) => ({
        name: c.name,
        color: c.hex,
        image: c.image,

        text: "text-black",
        btn: "border-black text-black hover:bg-black hover:text-white",
        desc: productBySlug.description,
    }));

    const similarProducts = products.filter(p => p.category === productBySlug.category);

    return (
        <>
            <DeviceShowcase
                products={showcaseProducts}
                title={productBySlug.category}
                desc={productBySlug.description}
            />
            {/* <VideoProduct /> */}
            <FeatureCarousel />
            <ProductConnect />
            <WhyAppleSection />

            <ProductDetailComparison products={similarProducts} />
            <Footer />
        </>
    );
};

export default ProductPages;
