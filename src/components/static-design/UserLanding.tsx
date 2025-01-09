import ProfileCard from "./userLanding-specifics/ProfileCard";
import QRCodeSection from "./userLanding-specifics/QRCodeSection";
import Tabs from "./userLanding-specifics/Tabs";
import ProductCard from "./userLanding-specifics/ProductCard";
import { productsItems } from "@/const/productsItems";
import AddReviewButton from "./userLanding-specifics/AddReviewButton";

export default function UserLanding() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:py-12 p-4 bg-gray-100 container mx-auto">
            <aside className="flex flex-col gap-6">
                <ProfileCard />
                <QRCodeSection />
                <AddReviewButton />
            </aside>

            <main className="bg-white p-4 lg:p-6 rounded-3xl flex flex-col gap-6">
                <Tabs />
                <div className="flex flex-col gap-6 ">
                    {productsItems.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </main>
        </div>
    );
}
