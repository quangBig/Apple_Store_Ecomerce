import React, { useState } from 'react';
import OrderSidebar from '../components/orders/OrderSidebar';
import OrderTabs from '../components/orders/OrderTabs';
import OrderSearchBar from '../components/orders/OrderSearchBar';
import OrderList from '../components/orders/OrderList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MOCK_ORDERS = [
    {
        id: '1',
        code: 'DH001',
        status: 'completed',
        statusLabel: 'HOÀN THÀNH',
        shopName: 'PLAYAH',
        products: [
            {
                img: '/product1.png',
                name: 'Bao Cao Su PlayAh Super Invisible Siêu Mỏng/ Nhiều Gel/ Kéo Dài Thời Gian/ Có Gai Hộp 10 size 52mm',
                variant: 'Kéo Dài - Hộp 3',
                quantity: 1,
                price: '62,000',
                oldPrice: '79,000',
            },
            {
                img: '/product2.png',
                name: 'Gel bôi trơn ấm nóng tăng khoái cảm nữ giới Stimulating Gel 70ml',
                variant: 'Quà Tặng - Gel 5ml',
                quantity: 1,
                price: '0',
                gift: true,
            }
        ],
        totalPrice: '32,000',
    },
    {
        id: '2',
        code: 'DH002',
        status: 'pending',
        statusLabel: 'CHỜ THANH TOÁN',
        shopName: 'Apple Store',
        products: [
            {
                img: '/iphone-15-pro.png',
                name: 'iPhone 15 Pro',
                variant: '256GB - Titan Xanh',
                quantity: 1,
                price: '29,990,000',
                oldPrice: '32,990,000',
            },
            {
                img: '/iphone-15-pro-case.png',
                name: 'Ốp lưng iPhone 15 Pro MagSafe',
                variant: 'Màu Đen',
                quantity: 1,
                price: '990,000',
                oldPrice: '1,190,000',
                gift: true,
            }
        ],
        totalPrice: '30,980,000',
    },
];

export default function OrderPage() {
    const [tab, setTab] = useState('all');
    // Lọc đơn theo tab nếu cần
    const filteredOrders = tab === 'all' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === tab);

    return (
        <>
            <Header />
            <div className="flex bg-[#fafafa] min-h-screen text-black">
                <OrderSidebar />
                <div className="flex-1 p-8">
                    <OrderTabs current={tab} onChange={setTab} />
                    <OrderSearchBar />
                    <OrderList orders={filteredOrders} />
                </div>
            </div>
            <Footer />
        </>
    );
} 