import AddToCartButton from "@/components/modules/cart/AddToCartButton";
import RelatedProduct from "@/components/modules/productsDetails/RelatedProduct";
import { Tab } from "@/components/modules/productsDetails/Tab";
import AddToWishlistButton from "@/components/modules/wishlist/AddToWishlistButton";
import { ssrFetch } from "@/lib/ssrFetch";
import { Item } from "@/types/Item";
import { Metadata } from "next";
import Image from "next/image";


export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id, name } = await params;

  const { data: item } = await ssrFetch<Item>(`/item/${id}`);

  const productName = item?.name || name || "Product Details";
  const description =
    item?.details
      ?.replace(/<[^>]*>?/gm, "")
      .slice(0, 150) || "Product information";

  const canonicalUrl = `http://localhost:3000/${name}/${id}`;

  return {
    title: productName,
    description,

    keywords: [
      productName,
      "car care products",
      "auto accessories",
      "foam cleaner",
      "automart",
      "buy car cleaning products online",
    ],

    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const PageComponents = async ({ params }: PageProps) => {
  const { name, id } = await params;

  const { data: item, error } = await ssrFetch<Item>(`/item/${id}`);

  

  if (error || !item) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-500 font-medium">
        Failed to load product information.
      </div>
    );
  }

  const imageSrc = item.resized_image
    ? `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${item.resized_image}`
    : "/placeholder.png";

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Product Image */}
          <div className="relative w-full h-[380px] rounded-xl border bg-white overflow-hidden">
            <Image
              src={imageSrc}
              alt={name || item.name || "Product image"}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div className="min-h-72">
              <h1 className="text-3xl font-bold text-gray-900">
                {item.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 line-through">
                  ৳{Number(item.regular_price).toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-red-600">
                  ৳{Number(item.sales_price).toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t" />

              {/* Description */}
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.details.slice(0, 450) || "" }}
              />
            </div>
            <div className="max-w-52 grid grid-cols-7 gap-2">
              <div className="col-span-4">
                <AddToCartButton product={item} />
              </div>
              <div className="col-span-3">
                <AddToWishlistButton product={item} />
              </div>
            </div>

          </div>
        </div>

      </section>
      <section>
        <Tab item={item} />
      </section>


      <RelatedProduct categoryId={item?.sub_category_id} />
    </>
  );
};

export default PageComponents;
