import { ssrFetch } from "@/lib/ssrFetch";
import { Item } from "@/types/Item";
import Card from "@/components/modules/shops/Card";


type Props = {
    categoryId: number;
};

export default async function RelatedProduct({ categoryId }: Props) {
    const { data, error } = await ssrFetch<Item[]>(
        `/items/subcategory/${categoryId}`
    );

    return (
        <div className="mt-10">
            <div>
                <Card products={data || []} nam='Related Products' gridcol="lg:grid-cols-5 grid-cols-2" />
            </div>
        </div>
    );
}