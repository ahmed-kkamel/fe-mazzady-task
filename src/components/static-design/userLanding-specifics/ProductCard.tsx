import ProductImageSection from "./ProductImageSection";
import ProductInfoSection from "./ProductInfoSection";
import LikeButton from "./LikeButton";
import { productsItems } from "@/const/productsItems";

export default function ProductCard({ product }: { product: typeof productsItems[0] }) {
    return (
        <div key={product.id} className="flex items-start justify-between">
            <div className="flex gap-4">
                <ProductImageSection product={product} />
                <ProductInfoSection product={product} />
            </div>
            <div className="hidden lg:flex items-center">
                <LikeButton liked={product.liked} />
            </div>
        </div>
    );
}
