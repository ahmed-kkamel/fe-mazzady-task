import Image from "next/image";
import { FC } from "react";
import { Divider } from "./Divider";

export const LanguageSwitcher: FC = () => (
    <div className="flex items-center gap-2">
        <Image
            src="/assets/global.svg"
            alt="Change language"
            width={24}
            height={24}
            className="cursor-pointer hidden lg:block"
        />
        <Divider />
        <p className="text-lg font-semibold hidden lg:block" aria-label="Selected language">
            EN
        </p>
    </div>
);