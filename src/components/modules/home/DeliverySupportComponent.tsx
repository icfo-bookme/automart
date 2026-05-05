"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface InfoItem {
  icon: string;
  title: string;
  description: string;
  details: {
    __html: string;
  };
}

const ShippingInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<InfoItem | null>(null);

  const items: InfoItem[] = [
    {
      icon: "/icons/shipping6.png",
      title: "Free Delivery",
      description: "Enjoy free shipping for all orders over ৳3000",
      details: {
        __html: `
          <p>We offer <strong>free delivery</strong> nationwide for all orders above ৳3000.</p>
          <ul class="list-disc pl-5 mt-2">
            <li>Delivery within 3–5 working days</li>
            <li>Remote areas may take longer</li>
            <li>No hidden charges</li>
          </ul>
        `,
      },
    },
    {
      icon: "/icons/shipping7.png",
      title: "Payment Method",
      description: "Pay using your credit card for any purchase",
      details: {
        __html: `
          <p>We support multiple secure payment options:</p>
          <ul class="list-disc pl-5 mt-2">
            <li>Visa / MasterCard</li>
            <li>Mobile Banking</li>
            <li>Cash on Delivery</li>
          </ul>
        `,
      },
    },
    {
      icon: "/icons/shipping8.png",
      title: "Return Policy",
      description: "We believe in making your experience quick and simple",
      details: {
        __html: `
          <p>Return products within <strong>7 days</strong> of delivery.</p>
          <p class="mt-2">Conditions:</p>
          <ul class="list-disc pl-5">
            <li>Product must be unused</li>
            <li>Original packaging required</li>
          </ul>
        `,
      },
    },
    {
      icon: "/icons/shipping9.png",
      title: "Hotline",
      description: "Ask any question you have & get instant answer",
      details: {
        __html: `
          <p>Our support team is available <strong>24/7</strong>.</p>
          <p class="mt-2">
            Call us at <a href="tel:+880123456789" class="text-primary underline">
            01888-022244
            </a>
          </p>
        `,
      },
    },
  ];

  const handleOpen = (item: InfoItem) => {
    setActiveItem(item);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full  py-2 my-6 border-gray-200 bg-white border rounded-lg">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleOpen(item)}
              className="flex cursor-pointer items-start gap-4 text-left hover:bg-gray-50 p-3 rounded-md transition"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />

              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {activeItem && (
                <Image
                  src={activeItem.icon}
                  alt={activeItem.title}
                  width={40}
                  height={40}
                  fetchPriority={"high"}
                  className="w-8 h-8"
                />
              )}
              {activeItem?.title}
            </DialogTitle>
          </DialogHeader>

          {/* HTML DETAILS */}
          <div
            className="text-sm text-gray-600 mt-2"
            dangerouslySetInnerHTML={activeItem?.details}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShippingInfo;
