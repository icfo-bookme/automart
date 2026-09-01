import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Item } from "@/types/Item";
import { Eye } from "lucide-react"
import Image from "next/image";
import limitWords from "./limitWords";
import { getYoutubeEmbedUrl } from "./youtube";
type ProductModalProps = {
    product: Item;
};
const ProductModal = ({ product }: ProductModalProps) => {

    const embedUrl = getYoutubeEmbedUrl(product.yt_video, {
        autoplay: true,
        mute: false,
        controls: true,
    });

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="absolute top-28 left-25 z-10 opacity-0 group-hover:opacity-100 cursor-pointer">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white">
                            <Eye />
                        </span>
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-3xl h-[60vh] p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                        {/* LEFT SIDE - IMAGE */}
                        <div className="relative bg-gray-50 flex items-center justify-center">
                            {embedUrl ? (
                                <div className="relative w-full h-full p-3 rounded-lg overflow-hidden">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={embedUrl}
                                        title="YouTube video"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/${product.thumbnail}`}
                                    alt={product.name}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                    priority
                                />
                            )}
                        </div>

                        {/* RIGHT SIDE - CONTENT */}
                        <div className="p-6 overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-semibold mb-4">
                                    {product.name}
                                </DialogTitle>

                                <DialogDescription asChild>
                                    <div
                                        className="prose max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: limitWords(product.details, 500),
                                        }}
                                    />
                                </DialogDescription>

                            </DialogHeader>
                        </div>

                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default ProductModal
