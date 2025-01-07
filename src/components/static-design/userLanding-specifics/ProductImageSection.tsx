import { ProductItem } from "@/types/ProductItem";
import Image from "next/image";

type ProductImageSectionProps = {
    product: Pick<ProductItem, "image" | "title" | "badge" | "liked">;
};

export default function ProductImageSection({ product }: ProductImageSectionProps) {
    return (
        <div className="lg:w-28 lg:h-28 w-32 h-24 relative">
            <div className="absolute top-1 left-1 z-50 lg:hidden flex items-center justify-center bg-white rounded-full">
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${product.liked ? "text-red-500" : "text-gray-400"}`}
                        fill={product.liked ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke={!product.liked ? "currentColor" : undefined}
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                                product.liked
                                    ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    : "M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.975a4.5 4.5 0 016.364 6.364l-7.07 7.07a.75.75 0 01-1.06 0l-7.07-7.07a4.5 4.5 0 010-6.364z"
                            }
                        />
                    </svg>
                </button>
            </div>
            <Image
                src={product.image}
                alt={product.title}
                className="w-full h-full rounded-2xl lg:rounded-3xl object-cover"
                layout="fill"
            />
            <div
                className={`text-white text-[8px] lg:text-xs px-2 py-1 rounded-br-2xl rounded-tl-2xl lg:rounded-br-3xl lg:rounded-tl-3xl ${product.badge.color} absolute bottom-0 right-0`}
            >
                {product.badge.type}
            </div>
        </div>
    );
}
