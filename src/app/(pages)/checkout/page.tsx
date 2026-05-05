"use client";

import BillingForm from "@/components/modules/cart/BillingForm";
import CartItemRow from "@/components/modules/cart/CartItemRow";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Page = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className="lg:grid grid-cols-7">
            <div className="col-span-5 w-[85%] mx-auto border-r p-4">
                <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
                <p className="text-gray-600">
                    Review your items and proceed to payment.
                </p>
                <BillingForm />
            </div> 
            <div className="col-span-2 min-h-screen p-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        Your cart is empty
                    </p>
                ) : (
                    
                    cartItems.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;
