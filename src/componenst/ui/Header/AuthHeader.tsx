import Logo from "@/componenst/svg/Logo";
import LogoRegWhite from "@/componenst/svg/LogoRegWhite";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonBack from "../Button/ButtonBack";

interface HeaderI {
    backUrl: string;
}
export default function AuthHeader(props: HeaderI) {
    const { backUrl } = props;
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(() => typeof window !== 'undefined');

    if (!mounted) return null;
    return (
        <div className="flex w-full justify-between items-center">
            <ButtonBack text={<></>} onClick={() => router.push(backUrl)} />
            {theme === "dark" ? <LogoRegWhite /> : <Logo />}
            <div></div>
        </div>
    )
}