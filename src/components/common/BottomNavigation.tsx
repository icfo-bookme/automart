"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Settings,
  ShoppingCart,
  Gift,
  User,
  Lock,
  Moon,
  ChevronRight,
  LogOut,
  Bell,
  Package,
  MessageCircle,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useAuth } from "@/context/AuthContext";

const BottomNavigation: React.FC = () => {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const {logout} = useAuth();

  const pathname = usePathname();
  const { user } = useAuth();
  //lougout function
  const handleLogout = async () => {
    await logout();
  };
  

  // AUTO CLOSE WHEN ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" />, href: "/" },
    { id: "shop", label: "Shop", icon: <ShoppingCart className="w-6 h-6" />, href: "/shop" },
    { id: "offer", label: "Offer", icon: <Gift className="w-6 h-6" />, href: "/offers" },
  ];

  const settingsGroups = [
    {
      label: "Account",
      items: [
        {
          href: "/profile",
          icon: <User className="w-4 h-4" />,
          label: "Profile Settings",
          description: "Edit your personal info",
        },
        {
          href: "/dashboard",
          icon: <Package className="w-4 h-4" />,
          label: "Dashboard",
          description: "View your orders & activity",
        },
        {
          href: "/my-orders",
          icon: <ShoppingCart className="w-4 h-4" />,
          label: "My Orders",
          description: "Track your purchases",
        },
        {
          href: "/contact",
          icon: <MessageCircle className="w-4 h-4" />,
          label: "Contact Support",
          description: "Get help & assistance",
        },
        {
          href: "/change-password",
          icon: <Lock className="w-4 h-4" />,
          label: "Change Password",
          description: "Update your credentials",
        },
        {
          href: "/notifications",
          icon: <Bell className="w-4 h-4" />,
          label: "Notifications",
          description: "Manage alerts & updates",
        },
      ],
    },
    {
      label: "Preferences",
      items: [
        {
          href: "/settings",
          icon: <Moon className="w-4 h-4" />,
          label: "Dark Mode",
          description: "Toggle appearance theme",
        },
      ],
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white sm:hidden border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              
              className={`flex flex-col items-center justify-center h-full w-full ${
                active === item.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {item.icon}
              <span className="text-[11px] mt-1">{item.label}</span>
            </div>
          </Link>
        ))}

        {/* SETTINGS DRAWER */}
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerTrigger asChild>
            <button
             
              className={`flex flex-col items-center justify-center h-full w-full ${
                active === "settings"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-[11px] mt-1">Settings</span>
            </button>
          </DrawerTrigger>

          {/* DRAWER CONTENT */}
          <DrawerContent className="h-full max-w-[260px] ml-auto bg-blue-50 text-gray-900 border-l border-gray-200 flex flex-col">
            
            {/* HEADER */}
            <DrawerHeader className="px-5 pt-6 pb-4 border-b border-gray-200">
              <DrawerTitle className="text-gray-900 font-semibold">
                Settings
              </DrawerTitle>
            </DrawerHeader>

            {/* USER */}
            <div className="mx-4 mt-4 rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user ? user.first_name.charAt(0) : "G"}
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {user ? `${user.first_name} ${user.last_name}` : "GUEST"}
                </p>
                <p className="text-xs text-gray-500">
                  {user ? user.email : "guest@email.com"}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto px-4 pt-5 space-y-5">
              {settingsGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] uppercase text-gray-500 mb-2">
                    {group.label}
                  </p>

                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white divide-y">
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-blue-100 transition">
                          <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
                            {item.icon}
                          </span>

                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-[11px] text-gray-500">
                              {item.description}
                            </p>
                          </div>

                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* LOGOUT */}
            <div className="px-4 pb-6 pt-2 border-t border-gray-200">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-500 border border-red-100">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default BottomNavigation;