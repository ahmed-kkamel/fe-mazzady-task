"use client"
import Image from "next/image";
import { useState } from "react";
import { LogoIcon } from "../header-specifics/logo";

export default function QRCodeSection() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className={`flex flex-col gap-2 lg:gap-4 bg-white rounded-3xl p-4 lg:p-6 ${isCollapsed ? "overflow-hidden" : ""}`}>
            <div className="flex justify-between items-center">
                <h3 className="text-lg lg:text-2xl font-semibold">QR Code</h3>
                <div className="flex gap-2 items-center">
                    {["eye", "send-square", "document-download"].map((icon) => (
                        <Image
                            key={icon}
                            src={`/assets/${icon}.svg`}
                            alt={icon}
                            width={24}
                            height={24}
                            className="cursor-pointer"
                        />
                    ))}
                    <div
                        className="cursor-pointer rounded-full bg-[#FBE7EE] flex items-center w-8 h-8 justify-center lg:hidden"
                        onClick={toggleCollapse}
                    >
                        <Image
                            src="/assets/arrow-up.svg"
                            alt="arrow"
                            width={16}
                            height={16}
                            className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>
            </div>

            {!isCollapsed && (
                <>
                    <div className="flex gap-2 p-4 items-center bg-[#FFF5E9] rounded-2xl">
                        <Image
                            src="/assets/document-download-2.svg"
                            alt="download"
                            width={24}
                            height={24}
                        />
                        <p className="text-[#333333] text-xs">
                            Download the QR code or share it with your friends.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-[#D20653] to-[#FF951D] rounded-[20px] flex justify-center items-center">
                        <div className="bg-white rounded-[20px] flex flex-col justify-center items-center gap-1 w-[90%] h-[90%]">
                            <LogoIcon w={"110"} h={"80"} />
                            <h2 className="text-lg lg:text-2xl font-semibold">Hala Ahmed</h2>
                            <div className="flex flex-col items-center justify-center">
                                <Image
                                    src="/assets/qr.png"
                                    alt="QR Code"
                                    width={100}
                                    height={100}
                                />
                                <figcaption className="text-xs mt-2">Follow Us on Mazaady</figcaption>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
