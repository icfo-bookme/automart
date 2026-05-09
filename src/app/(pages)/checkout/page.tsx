"use client";

import BillingForm from "@/components/modules/cart/BillingForm";
import CartItemRow from "@/components/modules/cart/CartItemRow";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Page = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <div className="lg:grid grid-cols-7">
            <div className="col-span-5 w-[85%] mx-auto border-r px-4 shadow-md my-5">
                <div className="pb-5 text-center">
                    <h1 className="text-xl font-semibold mb-2 uppercase bg-gray-950 text-white p-2">Billing Details</h1>
                    <p className="text-gray-600 mb-1">
                        Review your items and proceed to payment.
                    </p>
                    <hr />
                </div>
                
                <BillingForm />
            </div>
            <div className="col-span-2 min-h-screen p-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        Your cart is empty
                    </p>
                ) : (
                    <div>
                        <h1 className="text-xl font-semibold mb-2 uppercase bg-gray-950 text-white p-2">Your Order Details</h1>
                        {cartItems.map((item) => (
                            <CartItemRow key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
