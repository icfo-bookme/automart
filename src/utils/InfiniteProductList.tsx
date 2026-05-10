"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Item } from "@/types/Item";
import Header from "../components/modules/home/header";
import ProductModal from "./ProductModal";
import AddToCartButton from "@/components/modules/cart/AddToCartButton";
import { calculateDiscount } from "./calculateDiscount";
import { slugify } from "./slugify";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AddToWishlistButton from "@/components/modules/wishlist/AddToWishlistButton";

export default function InfiniteProductList({
  sort,
  styleClass,
  title,
  sectionId,
}: {
  sort?: string;
  styleClass?: string;
  title?: string;
  sectionId?: number;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [sort, sectionId]);

  const fetchItems = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      let url = "";

      if (sort === "newest") {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/items?page=${page}`;
      } else if (sort === "section") {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/sections/${sectionId}?page=${page}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/offers/items?page=${page}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const newItems: Item[] = data?.data?.data || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => {
          // ✅ remove duplicate by id
          const ids = new Set(prev.map((i) => i.id));
          const filtered = newItems.filter((i) => !ids.has(i.id));
          return [...prev, ...filtered];
        });

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [page, hasMore, sort, sectionId]);

  // ✅ Intersection Observer only (no initial double fetch)
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchItems();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchItems]);

  return (
    <div className="relative md:px-6 lg:px-8 py-6">
      <Header title={title || "All Product"} />

      <div className={`grid grid-cols-2 lg:${styleClass || "grid-cols-5"} gap-4`}>
        {items.map((item, index) => {
          const discount = calculateDiscount(
            item.regular_price,
            item.sales_price
          );

          return (
            <div
              key={item.id} // ✅ fixed key (no index)
              className="group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
            >
              {/* Discount */}
              {discount > 0 && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded">
                  {discount}% OFF
                </span>
              )}

              {/* Image */}
              <div className="relative h-56 p-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                  alt={item.details?.slice(0, 80) || item.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow border-t">
                <Link href={`/item/${slugify(item.name)}/${item.id}`}>
                  <p className="text-xs font-semibold text-gray-700 uppercase truncate">
                    {item.sub_category?.name || "Category"}
                  </p>

                  <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 min-h-[2.5rem]">
                    {item.name}
                  </h3>

                  <div className="text-xs text-gray-500 my-2">
                    Rate this product
                  </div>
                </Link>
                {/* Price */}
                <div className="flex items-center justify-between gap-2">


                  <div className="flex items-center gap-2">
                    {Number(item.sales_price) > 0 ? (
                      discount > 0 ? (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ৳
                            {Number(
                              item.regular_price
                            ).toLocaleString()}
                          </span>
                          <span className="text-lg font-bold text-red-600">
                            ৳
                            {Number(item.sales_price).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ৳
                          {Number(item.regular_price).toLocaleString()}
                        </span>
                      )
                    ) : (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded">
                        Call Us for Price
                      </span>
                    )}
                  </div>
                  {/* <div className="z-50">
                        <VideoModal />
                      </div> */}

                </div>


                <ProductModal product={item} />

                <div className="mt-auto grid grid-cols-3 gap-5 items-center justify-between opacity-100  transition-opacity duration-200">
                  <div className="cursor-pointer w-full col-span-2">
                    <AddToCartButton product={item} />
                  </div>

                  <AddToWishlistButton product={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader */}
      {hasMore && (
        <div ref={observerRef} className="h-20 flex justify-center items-center">
          {loading && (
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
}