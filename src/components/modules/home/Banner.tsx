"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { ChevronsRight } from "lucide-react"

const slides = [
    {
        id: 1,
        title: "Interior Accessories",
        subtitle: "Seat Cover, Steering Cover",
        alt: "Automart.com.bd - Premium car accessories and motorcycle parts online store in Bangladesh",
        image: "/slider/slider0.png",
    },
    {
        id: 5,
        title: "Interior Accessories",
        subtitle: "Seat Cover, Steering Cover",
        alt:"Professional car care products including 3M wax and Kangaroo foam cleaners for detailing in Bangladesh",
        image: "/slider/slider11.png",
    },
    {
        id: 2,
        title: "Car Floor Mats",
        subtitle: "Premium & Durable",
        alt:"Genuine motorcycle accessories and performance parts for R15 V4 and GSXR in Chattogram, Bangladesh",
        image: "/slider/slider12.png",
    },
   
    {
        id: 4,
        title: "Exterior Accessories",
        subtitle: "Style Your Ride",
        alt:"Flash sale on waterproof car body covers and hybrid battery filters at Automart Bangladesh",
        image: "/slider/slider09.jpg",
    },
]

export default function HeroCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="w-full p-2 relative">
            <Carousel
                opts={{ loop: true, align: "start" }}
                setApi={setApi}
                plugins={[
                    Autoplay({
                        delay: 3500,
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent className="-ml-4">
                    {slides.map((slide) => (
                        <CarouselItem
                            key={slide.id}
                            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <div className="relative h-[250px] rounded-xl overflow-hidden group">
                                <Image
                                    src={slide.image}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />


                                <div className="absolute bottom-5 left-5 text-white">
                                    {/* <h3 className="text-xl font-semibold">
                                        {slide.title}
                                    </h3>
                                    <p className="text-sm opacity-90 mb-3">
                                        {slide.subtitle}
                                    </p> */}

                                    <Button
                                        size="sm"
                                        asChild
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        {/* <Link
                                            href="/shop"
                                            className="flex items-center gap-1"
                                        >
                                            Shop Now <ChevronsRight size={16} />
                                        </Link> */}
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* DOTS */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            current === index
                                ? "bg-red-600 w-3 h-3"
                                : "bg-gray-400 w-3 h-3 hover:bg-gray-600"
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}
