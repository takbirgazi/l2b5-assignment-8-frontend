"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import logo2 from "@/assets/images/logo_2.png";

export function ToggleLogo() {

    const { theme } = useTheme();

    return(
        <figure>
            <Image
            width={100}
            height={35}
            src={theme == "dark" ? logo2 : logo}
            alt="No-Cash Logo"
            />
        </figure>
    )
}