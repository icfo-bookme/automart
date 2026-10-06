import InfiniteProductList from "@/utils/InfiniteProductList"
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Car & Bike Accessories Collection | Automart.com.bd',
  description: 'Explore our full range of automotive essentials. From interior gadgets to performance bike parts, find everything your vehicle needs at Automart Bangladesh.',
  openGraph: {
    title: 'Online Automotive Store Bangladesh | Automart.com.bd',
    description: 'Shop over 500+ car and bike products online.',
    images: ['/og-shop-banner.jpg'], // Path to your shop banner
  },
};

const page = () => {
    return (
        <InfiniteProductList title="Buy What You Love" styleClass="grid-cols-4" />
    )
}

export default page
