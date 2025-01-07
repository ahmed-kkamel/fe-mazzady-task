import { statsData } from "@/const/statsData";
import Image from "next/image";

export default function StatsSection() {
    return (
        <div className="flex items-center justify-between w-full lg:gap-4 gap-1">
            {statsData.map((item) => (
                <div key={item.id} className="flex gap-1 bg-[#FFF5E9] rounded-2xl px-4 lg:px-5 py-3">
                    <Image src={item.icon} alt={item.alt} width={24} height={24} />
                    <div className="flex flex-col">
                        <p className="font-bold text-sm flex gap-1 items-center">
                            {item.count}
                            {item.additionalText && (
                                <span className="text-xs text-gray-500 font-normal">{item.additionalText}</span>
                            )}
                        </p>
                        <p className="text-xs text-[#FF951D]">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}