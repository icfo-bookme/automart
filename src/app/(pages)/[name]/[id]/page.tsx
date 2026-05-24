
import { deslugify } from "@/utils/deslugify";
import InfiniteProductList from "@/utils/InfiniteProductList";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { name, id } = await params;
  const deslugifyName = deslugify(name);
  return {
    title: deslugifyName,
    description: deslugifyName, 
    keywords: [
      deslugifyName,
      "car care products",
      "auto accessories",
      "foam cleaner",
      "automart",
      "buy car cleaning products online",
    ],
  };
}



const page = async ({ params }: PageProps) => {
  const { name, id } = await params;
  let deslugifyName = deslugify(name);
  return (
    <div>
      <InfiniteProductList sort="section" title={deslugifyName} styleClass="grid-cols-5" sectionId={id} />
    </div>
  )
}

export default page
