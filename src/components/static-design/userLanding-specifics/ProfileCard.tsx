import Image from "next/image";
import StatsSection from "./StatsSection";

export default function ProfileCard() {
    return (
        <div className="flex flex-col gap-2 lg:gap-4 bg-white rounded-3xl p-4 lg:p-6">
            <Image src="/assets/profile-image-2.png" alt="Hala Ahmed" width={100} height={100} />
            <h2 className="text-lg lg:text-2xl font-semibold">Hala Ahmed</h2>
            <p className="text-sm text-[#4F4F4F]">
                I am Hala Ahmed, the owner of the local brand called Body which is for Makeup and Skin Care.
            </p>
            <StatsSection />
            <button className="bg-gradient-to-r from-[#D20653] to-[#FF951D] text-white py-3 rounded-xl font-bold text-base">
                Follow
            </button>
        </div>
    );
}