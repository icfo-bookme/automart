"use client";

import React, { useState } from "react";
import { Home, Settings, User, ShoppingCart, Gift } from "lucide-react";
import Link from "next/link";

const BottomNavigation: React.FC = () => {
  const [active, setActive] = useState<string>("home");

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" />, href: "/" },
    { id: "shop", label: "Shop", icon: <ShoppingCart className="w-6 h-6" />, href: "/shop" },
    { id: "offer", label: "Offer", icon: <Gift className="w-6 h-6" />, href: "/offers" },
    { id: "settings", label: "Settings", icon: <Settings className="w-6 h-6" />, href: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-gray-800 sm:hidden border-t border-gray-700 shadow-inner">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center justify-center h-full w-full text-white transition-colors duration-200 ${
                active === item.id
                  ? "text-white" // active color
                  : "text-gray-400 hover:text-white" // inactive + hover
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
