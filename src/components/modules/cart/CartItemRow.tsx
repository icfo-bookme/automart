"use client";

import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "@/store/cartSlice";
import { CartItem } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState } from "react";

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
    const dispatch = useDispatch();
    const [isRemoving, setIsRemoving] = useState(false);

    const handleIncrease = () => dispatch(increaseQty(item.id));
    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(decreaseQty(item.id));
        }
    };
    
    const handleRemove = () => {
        setIsRemoving(true);
        // Add slight delay for smooth animation
        setTimeout(() => dispatch(removeFromCart(item.id)), 300);
    };

    const subtotal = item.price * item.quantity;

    return (
       <Card
  className={`grid grid-cols-[auto_1fr] gap-4 p-4 transition-all duration-300 ${
    isRemoving ? "opacity-0 scale-95" : "opacity-100"
  }`}
>
  {/* LEFT: Image */}
  <div className="relative w-20 h-20 md:w-24 md:h-24">
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-50">
      <Image
        src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
        alt={item.title}
        fill
        className="object-cover"
      />
    </div>

    {item.quantity > 1 && (
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
        ×{item.quantity}
      </span>
    )}
  </div>

  {/* RIGHT: Info */}
  <div className="grid gap-2">
    {/* Title & unit price */}
    <div>
      <h3 className="font-semibold text-gray-900 line-clamp-1">
        {item.title}
      </h3>
      <p className="text-sm text-gray-500">
        Unit Price: ৳{item.price.toLocaleString()}
      </p>
    </div>

    {/* Bottom row */}
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      {/* Quantity */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className="h-8 w-8 p-0 rounded-full"
        >
          <Minus className="w-3 h-3" />
        </Button>

        <span className="min-w-6 text-center font-medium">
          {item.quantity}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={handleIncrease}
          className="h-8 w-8 p-0 rounded-full"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Spacer */}
      <div />

      {/* Price & remove */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-lg text-gray-900">
            ৳{subtotal.toLocaleString()}
          </p>
          {item.quantity > 1 && (
            <p className="text-xs text-gray-500">
              ৳{item.price.toLocaleString()} × {item.quantity}
            </p>
          )}
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</Card>

    );
}