import ProductTimeLeft from "./ProductTimeLeft";
import { ProductItem } from "@/types/ProductItem";

type ProductInfoSectionProps = {
    product: Pick<ProductItem, "title" | "price" | "timeLeft">;
};

export default function ProductInfoSection({ product }: ProductInfoSectionProps) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xs lg:text-lg text-[#333333]">{product.title}</h3>
            <p className="text-xs lg:text-lg text-[#828282]">
                Starting Price <span className="text-black font-bold">{product.price}</span>
            </p>
            <ProductTimeLeft timeLeft={product.timeLeft} />
        </div>
    );
}
