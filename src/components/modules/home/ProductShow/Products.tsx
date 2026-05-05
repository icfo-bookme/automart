import { ssrFetch } from "@/lib/ssrFetch";
import Header from "../header";

import { ProductCarousel } from "@/utils/ProductCarousel";
import { Item } from "@/types/Item";

type LatestProductProps = {
    sectionId: number;
    sectionName?: string;
    headerTitle?: string;
};

const Product = async ({ sectionId, sectionName, headerTitle }: LatestProductProps) => {
    const { data, error } = await ssrFetch<Item[]>(
        `/items/${sectionId}`
    );

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <div>
                <Header
                    title={headerTitle || "Latest Products"} sectionId={sectionId}
                />
            </div>
            <div>
                <ProductCarousel products={data || []} />
            </div>
        </>
    );
};

export default Product;
