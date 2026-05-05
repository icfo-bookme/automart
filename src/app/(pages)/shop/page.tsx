import Sidebar from "@/components/modules/shops/Sidebar"
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
        <div className="container mx-auto min-h-[calc(100vh-100px)]">
            <div className=" md:grid grid-cols-12">
                <div className="hidden lg:block col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                   <InfiniteProductList title="Buy What You Love" styleClass="grid-cols-4" />
                </div>
            </div>
        </div>
    )
}

export default page
