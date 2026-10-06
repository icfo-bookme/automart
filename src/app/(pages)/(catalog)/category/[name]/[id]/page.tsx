import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deslugify } from "@/utils/deslugify";
import InfiniteProductList from "@/utils/InfiniteProductList";

type CategoryPageProps = {
    params: Promise<{ name: string; id: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { name } = await params;
    const categoryName = deslugify(name);

    return {
        title: `${categoryName} | All Products`,
        description: `Browse all ${categoryName} products at Automart Bangladesh.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { name, id } = await params;
    const categoryId = Number(id);

    if (!Number.isSafeInteger(categoryId) || categoryId <= 0) {
        notFound();
    }

    return (
        <InfiniteProductList
            key={categoryId}
            sort="category"
            categoryId={categoryId}
            title={`${deslugify(name)} - All Products`}
            styleClass="grid-cols-4"
        />
    );
}
