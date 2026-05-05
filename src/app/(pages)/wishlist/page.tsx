"use client";

import { Trash2, Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { addToCart } from "@/store/cartSlice";
import { RootState } from "@/store";
import { removeFromWishlist, clearWishlist } from "@/store/wishlistSlice";

type WishlistItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    barcode: string | null;
    regular_price: string | null;
    cost_price: string | null;
};

const Page = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const handleRemove = (id: number) => {
        dispatch(removeFromWishlist(id));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
        toast.success("Wishlist cleared successfully");
    };

    const handleAddToCart = (item: WishlistItem) => {
        dispatch(
            addToCart({
                id: item.id,
                title: item.title,
                barcode: item.barcode,
                regular_price: item.regular_price,
                cost_price: item.cost_price,
                price: Number(item.price),
                thumbnail: item.thumbnail,
            })
        );

        dispatch(removeFromWishlist(item.id));

        toast.success(`"${item.title}" has been successfully added to your cart.`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

                        {/* Title */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <div className="p-2 bg-pink-50 rounded-lg">
                                <Heart className="w-6 h-6 text-pink-600" fill="currentColor" />
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    My Wishlist
                                </h1>

                                <p className="text-gray-600">
                                    {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
                                </p>
                            </div>
                        </div>

                        {/* Remove All Button */}
                        {wishlist.length > 0 && (
                            <button
                                onClick={handleClearWishlist}
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Remove All
                            </button>
                        )}
                    </div>
                </div>

                {/* Wishlist Content */}
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                                <Heart className="w-10 h-10 text-gray-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Your wishlist is empty
                            </h3>

                            <p className="text-gray-600 mb-8">
                                Save items you love by clicking the heart icon. They'll appear here.
                            </p>

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto gap-8">

                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b bg-gray-50 text-sm font-medium text-gray-600">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-3 text-center">Price</div>
                                <div className="col-span-3 text-center">Actions</div>
                            </div>

                            {/* Items */}
                            <div className="divide-y">
                                {wishlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-4 md:p-6 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6">

                                            {/* Product */}
                                            <div className="flex gap-4 md:col-span-6">
                                                <div className="relative">

                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                                                        alt={item.title}
                                                        width={100}
                                                        height={100}
                                                        className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
                                                    />

                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="cursor-pointer absolute -top-2 -right-2 p-1.5 bg-white border rounded-full shadow-sm hover:bg-gray-50"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>

                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-gray-600 text-sm mb-4">
                                                        In Stock
                                                    </p>

                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
                                                    >
                                                        Move to Cart
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="md:col-span-3 flex items-center justify-center">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    ৳ {Number(item.price).toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="md:col-span-3 flex flex-col gap-3 items-center justify-center">

                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="cursor-pointer w-full md:w-auto px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800"
                                                >
                                                    Add to Cart
                                                </button>

                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="cursor-pointer text-sm text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;