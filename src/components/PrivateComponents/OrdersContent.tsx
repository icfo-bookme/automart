"use client";

import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const OrdersContent = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-orders`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setOrders(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-red-600">My Orders</h1>
                    <p className="text-gray-500 mt-1">Total Orders: {orders.length}</p>
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-10 text-center">
                        <h2 className="text-xl font-semibold text-red-600">No Orders Found</h2>
                        <p className="text-gray-500 mt-2">You have not placed any orders yet.</p>
                    </div>
                )}

                {/* Orders List */}
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-red-50 border-b border-red-100">
                                <div>
                                    <p className="font-bold text-red-600">{order.order_code}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {order.city}, {order.district}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 0
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    {order.status === 0 ? "Pending" : "Completed"}
                                </span>
                            </div>

                            {/* Products */}
                            <div className="divide-y divide-gray-100">
                                {order.order_details.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between px-6 py-3">
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{item.product_name}</p>
                                            <p className="text-xs text-gray-400">Qty: {item.quantity} × ৳{item.unit_price}</p>
                                        </div>
                                        <p className="font-semibold text-gray-800 text-sm">৳{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="flex items-center justify-between px-6 py-4 bg-red-50 border-t border-red-100">
                                {order.discount_amount > 0 && (
                                    <p className="text-xs text-gray-500">Discount: ৳{order.discount_amount}</p>
                                )}
                                <p className="text-base font-bold text-red-600 ml-auto">
                                    Total: ৳{order.order_details.reduce((acc, item) => acc + item.price, 0) - order.discount_amount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersContent;