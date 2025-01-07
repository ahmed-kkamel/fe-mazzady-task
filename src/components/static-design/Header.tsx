import { FC } from "react";
import { LogoAndNavigation } from "./header-specifics/LogoAndNavigation";
import { HeaderActions } from "./header-specifics/HeaderActions";


export const Header: FC = () => {
    return (
        <header className="flex justify-between items-center px-4 lg:px-6 py-4 bg-white ">
            <LogoAndNavigation />
            <HeaderActions />
        </header>
    );
};

