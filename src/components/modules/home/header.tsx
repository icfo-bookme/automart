import { slugify } from "@/utils/slugify";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
  sectionName?: string;
  sectionId?: number;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  sectionId,
  center = false,
}) => {
  return (
    <div className={`mb-3 ${center ? "text-center" : "text-left"}`}>
      <div
        className={`flex items-center gap-4 ${
          center ? "justify-center" : ""
        }`}
      >
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 whitespace-nowrap">
          {title}
        </h1>

        {/* Divider */}
        <div className="flex-1 h-[1px] bg-gray-300 mt-2"></div>

        {/* Button */}
        {sectionId && (
          <Link
            href={`/${slugify(title)}/${sectionId}`}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <span>See All</span>

          {/* Arrow Icon */}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

            {/* Hover Glow */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300"></span>
          </Link>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;