import InfiniteProductList from "@/utils/InfiniteProductList"
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Special Offers & Discounts | Automart.com.bd',
    description: 'Find the best deals on car and bike accessories in Bangladesh. Shop premium brands at discounted prices with fast delivery from Automart.',
    openGraph: {
        title: 'Automotive Flash Sale - Automart Bangladesh',
        description: 'Huge savings on car care, interior gadgets, and motorcycle parts.',
        url: 'https://automart.com.bd',
        siteName: 'Automart',
        type: 'website',
        locale: 'en_US',
    },
};

const page = () => {
    return (
        <InfiniteProductList sort="newest" title="Limited Time Deals" styleClass="grid-cols-4" />
    )
}

export default page
