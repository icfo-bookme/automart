import Card from "@/components/modules/shops/Card";
import { ssrFetch } from "@/lib/ssrFetch";
import { Item } from "@/types/Item";
import { Metadata } from "next";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { name } = await params;
  // Capitalize the slug for the title
    const categoryName = name

  return {
    title: `Best ${categoryName} Collection in Bangladesh | Automart.com.bd`,
    description: `Buy genuine ${categoryName} products online. Browse our latest collection of high-quality automotive items at the best prices in Chattogram and Dhaka.`,
    keywords: [`${categoryName} shop`, `${categoryName} price in BD`, 'Automart accessories'],
  };
}

const page = async ({ params }: PageProps) => {
    const { name, id } = await params;

    const { data, error } = await ssrFetch<Item[]>(
        `/items/subcategory/${id}`
    );
   
    return (
        <div>
            <Card products={data || []} nam={name} />
        </div>
    )
}

export default page
