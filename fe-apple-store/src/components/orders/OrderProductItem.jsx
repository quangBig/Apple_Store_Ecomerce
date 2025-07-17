export default function OrderProductItem({ product }) {
    return (
        <div className="flex gap-3 py-2">
            <img src={product.img} className="w-16 h-16 object-cover rounded border" alt="" />
            <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-gray-500 mb-1">Phân loại hàng: {product.variant}</div>
                {product.gift && <span className="inline-block text-xs border border-[#ee4d2d] text-[#ee4d2d] px-1 rounded mr-2">Quà Tặng</span>}
            </div>
            <div className="text-right">
                {product.oldPrice && <div className="line-through text-gray-400 text-sm">{product.oldPrice}₫</div>}
                <div className="text-[#ee4d2d] font-bold">{product.price}₫</div>
                <div className="text-xs text-gray-500">x{product.quantity}</div>
            </div>
        </div>
    );
} 