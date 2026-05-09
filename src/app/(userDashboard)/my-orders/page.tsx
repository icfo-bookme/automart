"use client";
import OrdersContent from "@/components/PrivateComponents/OrdersContent";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const MyOrdersPage = () => {
    return (
        <PrivateRoute>
            <OrdersContent />
        </PrivateRoute>
    );
};

export default MyOrdersPage;