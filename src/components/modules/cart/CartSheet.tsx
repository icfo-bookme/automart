"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation"; 
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import CartItemRow from "./CartItemRow";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CartSheet() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isOpen, setIsOpen] = React.useState(false);

  const pathname = usePathname();

  // Close sheet when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* ✅ SheetTrigger must have ONE child */}
      <SheetTrigger asChild>
        <div className="relative">
          {/* Desktop button */}
          <Button
            variant="destructive"
            className="hidden md:flex items-center gap-2 py-5 text-white font-bold hover:bg-red-800"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>

            {cartItems.length > 0 && (
              <span className="ml-1 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                {cartItems.length}
              </span>
            )}
          </Button>

          {/* Mobile icon button */}
          <Button
            size="icon"
            variant="destructive"
            className="md:hidden relative text-white hover:bg-red-800"
          >
            <ShoppingCart className="h-6 w-6" />

            {cartItems.length > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-blue-600 text-white"
              >
                {cartItems.length}
              </Badge>
            )}
          </Button>
        </div>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent side="right" className="w-[400px] max-w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex-1 overflow-y-auto">
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

        {cartItems.length > 0 && (
          <div className="m-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold mb-4 w-[80%] mx-auto">
              <span>Total:</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <div className="w-[100%] mx-auto">
                <Button
                  className="w-full text-xl bg-red-600 hover:bg-red-800 text-white "
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Button>
              </div>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
