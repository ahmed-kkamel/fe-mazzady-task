import { TimeLeft } from "@/types/ProductItem";

type ProductTimeLeftProps = {
    timeLeft: TimeLeft;
};
export default function ProductTimeLeft({ timeLeft }: ProductTimeLeftProps) {
    return (
        <div className="text-[#828282] flex flex-col lg:flex-row gap-2 lg:gap-5 items-start lg:items-center justify-center">
            <p className="text-xs lg:text-lg">Lot Starts In</p>
            <div className="flex text-[8px] lg:text-lg gap-[2px] lg:gap-2">
                {Object.entries(timeLeft).map(([key, value]) => (
                    <span
                        key={key}
                        className="text-[#FF951D] font-bold bg-[#FFF5E9] rounded-3xl p-2"
                    >
                        {value} {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                ))}
            </div>
        </div>
    );
}
