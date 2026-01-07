import Logo from "@/componenst/svg/Logo";
import { useRouter } from "next/navigation";
import ButtonBack from "../Button/ButtonBack";
import { useTheme } from "next-themes";
import LogoRegWhite from "@/componenst/svg/LogoRegWhite";
import { useEffect, useState } from "react";

interface HeaderI {
    backUrl: string;
}
export default function AuthHeader(props: HeaderI) {
    const { backUrl } = props;
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div className="flex w-full justify-between items-center">
            <ButtonBack text={<></>} onClick={() => router.push(backUrl)} />
            {theme === "dark" ? <LogoRegWhite /> : <Logo />}
            <div></div>
        </div>
    )
}