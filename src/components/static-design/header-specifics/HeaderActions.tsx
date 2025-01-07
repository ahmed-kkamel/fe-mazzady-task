import { FC } from "react";
import { HeaderIcon } from "./HeaderIcon";
import { Divider } from "./Divider";
import Image from "next/image";
import { AddProductButton } from "./AddProductButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const HeaderActions: FC = () => {
    return (
        <div className="flex items-center lg:gap-8 gap-3">
            <div className="flex items-center gap-6">
                <HeaderIcon src="/assets/search.svg" alt="Search" />
                <Divider />
                <HeaderIcon src="/assets/notification.svg" alt="Notifications" />
                <Divider />
                <Image
                    src="/assets/profile-image.png"
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full"
                />
                <AddProductButton >Add new product</AddProductButton>
            </div>
            <LanguageSwitcher />
        </div>
    );
};