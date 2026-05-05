"use client";

import Image from "next/image";
import { useState, MouseEvent } from "react";

type ImageZoomProps = {
  src: string;
  alt?: string;
};

export default function ImageZoom({ src, alt }: ImageZoomProps) {
  const [bgPos, setBgPos] = useState<string>("50% 50%");
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <div className="flex gap-6 items-start relative">
      {/* LEFT IMAGE */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative w-80 h-80 border overflow-hidden cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt || "Zoomed image"}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          priority
        />
      </div>

      {/* RIGHT ZOOM PREVIEW */}
      {isHover && (
        <div
          className="w-80 h-80 border shadow-lg"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: bgPos,
            backgroundSize: "200%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
