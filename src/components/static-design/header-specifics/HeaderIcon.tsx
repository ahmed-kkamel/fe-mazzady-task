import Image from "next/image";
import { FC } from "react";

export const HeaderIcon: FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <Image src={src} alt={alt} width={24} height={24} className="cursor-pointer" />
);