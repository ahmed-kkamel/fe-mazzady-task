import Image from "next/image";
import { FC, PropsWithChildren } from "react";

type AddProductButtonProps = PropsWithChildren<{
    ariaLabel?: string;
}>;

export const AddProductButton: FC<AddProductButtonProps> = ({
    children,
    ariaLabel = "Add new product",
}) => (
    <button
        className="bg-gradient-to-r from-[#D20653] to-[#FF951D] text-white px-4 py-2 rounded-xl gap-2 items-center justify-center cursor-pointer hidden lg:flex"
        aria-label={ariaLabel}
    >
        <Image
            src="/assets/add-circle.svg"
            alt={`${ariaLabel} icon`}
            width={18}
            height={18}
        />
        {children}
    </button>
);
