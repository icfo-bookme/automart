
import { deslugify } from "@/utils/deslugify";
import InfiniteProductList from "@/utils/InfiniteProductList";
const page = async ({ params }: PageProps) => {
     const { name, id } = await params;
     let deslugifyName = deslugify(name);
  return (
    <div>
       
       <InfiniteProductList sort="section" title = {deslugifyName} styleClass="grid-cols-5" sectionId={id} />
    </div>
  )
}

export default page
