import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";

import Header from "@/components/common/Header";
import BottomHeader from "@/components/common/BottomHeader";
import Footer from "@/components/common/Footer";
import BottomNavigation from "@/components/common/BottomNavigation";

import ReduxProvider from "@/providers/ReduxProvider";
import FloatingButton from "@/components/modules/cart/FloatingButton";

import { ShoppingCart } from "lucide-react";
import { Toaster } from "sonner";
import BlogPage from "@/components/modules/home/Blog";
import { AuthProvider } from "@/context/AuthContext";
import Search from "@/components/common/Search";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://automart.com.bd"),
  title: {
    default: "Automart | Car Accessories & Auto Parts Online in Bangladesh",
    template: "%s | Automart",
  },
  description:
    "Automart is Bangladesh’s trusted online shop for car accessories, auto parts, and car care products. Buy air filters, engine oil, floor mats, horns, lights & more at best prices with fast delivery in Chittagong.",
  keywords: [
    "automart",
    "car accessories bangladesh",
    "auto parts online bd",
    "car care products",
    "car care in chittagong",
    "car services in chittagong",
    "buy car accessories",
    "buy auto parts",
    "interior accessories",
    "exterior accessories",
    "engine oil",
    "air filter",
    "car floor mat",
    "horn",
    "car light",
    "automart bd",
  ],
  authors: [{ name: "Automart Bangladesh" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Automart | Car Accessories & Auto Parts Online in Bangladesh",
    description:
      "Shop premium car accessories, auto parts & car care products online in Bangladesh with best prices and fast delivery.",
    url: "https://automart.com.bd",
    siteName: "Automart",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automart | Premium Car Accessories in Bangladesh",
    description:
      "Buy car accessories, auto parts & car care items online with fast delivery across Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MHGH622');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`antialiased ${rubik.variable} font-sans bg-[#F8F8F8]`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MHGH622"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AuthProvider>
          <ReduxProvider>
            <Header />
            <div className="col-span-3 md:hidden flex px-2 pt-1">
              <Search />
            </div>

            <div className="hidden md:block">
              <BottomHeader />
            </div>

            {children}

            {/* Floating cart button */}
            <div className="">
              <FloatingButton icon={<ShoppingCart />} label="Cart" />
            </div>
            <BlogPage />
            <Footer />
            <BottomNavigation />

            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                style: {
                  background: "#16a34a",
                  color: "#ffffff",
                },
              }}
            />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
