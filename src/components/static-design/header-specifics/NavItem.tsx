import { FC } from "react";
import { NavItemType } from "@/types/navItem";
export const NavItem: FC<{ item: NavItemType; isActive: boolean }> = ({ item, isActive }) => {
    return (
        <li
            className={`relative pb-2 text-lg ${isActive ? "text-[#D20653] font-bold" : "text-[#828282]"
                } cursor-pointer`}
        >
            {item.name}
            {isActive && (
                <span
                    className="absolute bottom-0 left-0 w-full h-[6px] bg-[#D20653] rounded-t-xl"
                    aria-hidden="true"
                />
            )}
        </li>
    );
};