"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Item } from "@/types/Item";
import ProductModal from "./ProductModal";
import { slugify } from "./slugify";
import AddToCartButton from "@/components/modules/cart/AddToCartButton";
import AddToWishlistButton from "@/components/modules/wishlist/AddToWishlistButton";

interface ProductCarouselProps {
  products: Item[];
}

const calculateDiscount = (regular: number | string, sales: number | string) => {
  const r = Number(regular);
  const s = Number(sales);
  if (!r || r <= s) return 0;
  return Math.round(((r - s) / r) * 100);
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [slidesToScroll, setSlidesToScroll] = React.useState(5);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToScroll(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToScroll(3);
      } else {
        setSlidesToScroll(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full md:px-6 lg:px-8 py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((item) => {
            const discount = calculateDiscount(item.regular_price, item.sales_price);

            return (
              <CarouselItem
                key={item.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Image / Video */}
                  <div className="relative h-56 p-3">
                    {item.yt_video ? (
                      <div className="relative w-full h-56 p-3 rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full rounded-lg"
                          src={`https://www.youtube.com/embed/${item.yt_video.split("v=")[1]}?autoplay=1&mute=1&controls=1`}
                          title="YouTube video"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.thumbnail}`}
                        alt={item.details.slice(0, 80) || item.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col flex-grow border-t">
                    <Link href={`/item/${slugify(item.name)}/${item.id}`} className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 uppercase truncate">
                        {item.sub_category?.name || "Category"}
                      </p>

                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 h-10">
                        {item.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-2">
                        <span className="text-xs text-gray-500 ml-1">Rate this product</span>
                      </div>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {Number(item.sales_price) > 0 ? (
                          discount > 0 ? (
                            <>
                              <span className="text-sm line-through text-gray-400">
                                ৳{Number(item.regular_price).toLocaleString()}
                              </span>
                              <span className="text-lg font-bold text-red-600">
                                ৳{Number(item.sales_price).toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ৳{Number(item.regular_price).toLocaleString()}
                            </span>
                          )
                        ) : (
                          <span className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded">
                            Call Us for Price
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto grid grid-cols-3 gap-4 items-center">
                      <div className="col-span-2">
                        <AddToCartButton product={item} />
                      </div>
                      <AddToWishlistButton product={item} />
                      <ProductModal product={item} />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="
            absolute -left-4 lg:-left-12 top-[45%] -translate-y-1/2 z-10
            h-11 w-11 rounded-full
            bg-white border-2 border-red-600 text-red-600
            hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95
            transition-all duration-200 shadow-sm
            ">
          &lt;
        </CarouselPrevious>

        <CarouselNext className="
            absolute -right-5 lg:-right-12 top-[45%] -translate-y-1/2 z-10
            h-11 w-11 rounded-full
            bg-white border-2 border-red-600 text-red-600
            hover:bg-red-600 hover:text-white hover:scale-110 active:scale-95
            transition-all duration-200 shadow-sm
          ">
          &gt;
        </CarouselNext>
      </Carousel>
    </div>
  );
};