
import { useTheme } from "@/utils/useTheme";
import { useRouter } from "next/navigation";
import ButtonBack from "../Button/ButtonBack";
import Logo from "../../svg/Logo";
import LogoRegWhite from "../../svg/LogoRegWhite";

interface HeaderI {
    backUrl: string;
}
export default function AuthHeader(props: HeaderI) {
    const { backUrl } = props;
    const router = useRouter();
    const { theme } = useTheme();
    return (
        <div className="flex w-full justify-between items-center">
            <ButtonBack text={<></>} onClick={() => router.push(backUrl)} />
            {theme === "dark" ? <LogoRegWhite /> : <Logo />}
            <div></div>
        </div>
    )
}