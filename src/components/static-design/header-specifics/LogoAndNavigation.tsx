import Image from "next/image";
import { LogoIcon } from "./logo";
import { navItems } from "@/const/navItems";
import { NavItem } from "./NavItem";
import { FC } from "react";
import { NavItemType } from "@/types/navItem";


export const LogoAndNavigation: FC = () => {
    return (
        <div className="flex items-center gap-2 lg:gap-10">
            <Image
                src="/assets/menu.svg"
                alt="Open menu"
                width={24}
                height={24}
                className="lg:hidden cursor-pointer"
                aria-label="Open menu"
            />
            <LogoIcon />
            <nav className="hidden lg:block" aria-label="Main Navigation">
                <ul className="flex items-center gap-10">
                    {navItems.map((item: NavItemType, index) => (
                        <NavItem key={index} item={item} isActive={index === 0} />
                    ))}
                </ul>
            </nav>
        </div>
    );
};
