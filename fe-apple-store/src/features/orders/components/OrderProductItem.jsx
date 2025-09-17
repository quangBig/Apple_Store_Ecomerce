export default function OrderCard({ order }) {
    return (
        <div className="border rounded-lg p-5 mb-6 bg-white shadow-md">
            {/* Header đơn hàng */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-gray-500">Mã đơn:</span>{" "}
                    <span className="font-semibold text-base">{order._id}</span>
                </div>
                <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {order.status}
                </span>
            </div>

            {/* Danh sách sản phẩm */}
            <div>
                {order.items.map((item) => (
                    <div
                        key={item.productId}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                        {/* Ảnh */}
                        <img
                            src={item.image}
                            alt={item.variantName || "Sản phẩm"}
                            className="w-20 h-20 object-cover rounded border"
                        />

                        {/* Thông tin */}
                        <div className="flex-1 px-4">
                            <div className="font-semibold text-base">
                                {item.name}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {item.variantName && (
                                    <span>{item.variantName}</span>
                                )}
                                {item.color && <span> / {item.color}</span>}
                            </div>
                            <div className="text-gray-500 text-sm">
                                SL: {item.quantity}
                            </div>
                        </div>

                        {/* Giá */}
                        <div className="text-[#ee4d2d] font-bold text-lg">
                            {Number(item.price).toLocaleString()}₫
                        </div>
                    </div>
                ))}
            </div>

            {/* Địa chỉ nhận hàng */}
            <div className="mt-5 text-gray-800 text-base">
                <div className="font-semibold mb-1">📍 Địa chỉ nhận hàng</div>
                <p>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
            </div>

            {/* Ghi chú */}
            {order.note && (
                <div className="mt-3 text-base text-gray-700 italic">
                    📝 Ghi chú: {order.note}
                </div>
            )}

            {/* Tổng tiền */}
            <div className="mt-5 text-right">
                <div className="text-gray-600 text-base">
                    Tạm tính: {Number(order.subtotal).toLocaleString()}₫
                </div>
                <div className="text-gray-600 text-base">
                    Phí ship: {Number(order.shippingFee).toLocaleString()}₫
                </div>
                <div className="text-xl font-bold text-[#ee4d2d]">
                    Tổng: {Number(order.total).toLocaleString()}₫
                </div>
            </div>

            {/* Ngày tạo */}
            <div className="mt-3 text-sm text-gray-500 text-right">
                Ngày đặt: {new Date(order.createdAt).toLocaleString()}
            </div>
        </div>
    );
}
