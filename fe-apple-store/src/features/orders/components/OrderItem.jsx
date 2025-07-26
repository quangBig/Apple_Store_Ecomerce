import OrderProductItem from './OrderProductItem';
export default function OrderItem({ order }) {
    return (
        <div className="bg-white rounded-lg shadow mb-6 border">
            <div className="flex justify-between items-center px-4 py-2 border-b">
                <div className="flex items-center gap-2">

                    <span className="font-semibold">Apple Store</span>

                </div>
                <div className="flex items-center gap-2">
                    <span className="text-green-600 text-sm">Giao hàng thành công</span>
                    <span className="text-[#ee4d2d] font-bold">{order.statusLabel}</span>
                </div>
            </div>
            <div className="px-4">
                {order.products.map((p, idx) => <OrderProductItem key={idx} product={p} />)}
            </div>
            <div className="flex justify-end items-center px-4 py-2 border-t">
                <span className="mr-4">Thành tiền: <span className="text-2xl text-[#ee4d2d] font-bold">{order.totalPrice}₫</span></span>
                <button className="bg-[#ee4d2d] text-white px-6 py-2 rounded mr-2">Đánh Giá</button>
                <button className="bg-white border border-[#ee4d2d] text-[#ee4d2d] px-6 py-2 rounded mr-2">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
                <button className="bg-[#ee4d2d] text-white px-4 py-2 rounded">Chat</button>
            </div>
        </div>
    );
} 