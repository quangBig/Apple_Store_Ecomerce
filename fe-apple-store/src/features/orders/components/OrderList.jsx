import OrderItem from './OrderItem';

export default function OrderList({ orders }) {
    if (!orders.length) return <div className="p-8 text-center text-gray-500">Không có đơn hàng nào.</div>;
    return (
        <div>
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
} 