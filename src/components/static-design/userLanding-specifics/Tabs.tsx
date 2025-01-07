import { buttonData } from "@/const/buttonData";
import { AddProductButton } from "../header-specifics/AddProductButton";

export default function Tabs() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                {buttonData.map((button) => (
                    <button
                        key={button.id}
                        className={`px-4 py-2 text-sm border rounded-2xl ${button.isActive
                            ? "bg-[#FFF5E9] text-[#FF951D] border-[#FF951D] font-bold"
                            : "bg-[#FFFFFF] text-[#828282] border-[#E0E0E0]"
                            }`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
            <AddProductButton >Add Review</AddProductButton>
        </div>
    );
}