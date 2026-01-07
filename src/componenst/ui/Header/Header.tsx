import Logo from "@/componenst/svg/Logo";
import LogoRegWhite from "@/componenst/svg/LogoRegWhite";
import { useWindowWidth } from "@/utils/useWindowsWidth";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGradientSmall from "../Button/ButtonGradientSmall";
import LangButton from "../Button/LangButton";
import ThemeButton from "../Button/ThemeButton";
import LinkHeader from "../Link/LinkHeader";
import RegModal from "../Modal/RegModal";

export default function Header() {
    const { theme } = useTheme();
    const { t } = useTranslation("common");
    const router = useRouter();

    const [isOpenReg, setIsOpenReg] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setMounted(true);
        setWidth(window.innerWidth);

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!mounted) return null; // чекаємо клієнт

    const locale = router.locale || "en";

    return (
        <>
            <header className="w-full py-[17px] bg-bg-header dark:bg-bg-dark box z-10" style={{ boxShadow: "0px 0px 20px #7EA310" }}>
                <div className="w-full flex items-center justify-center">
                    {theme === "dark" ? <LogoRegWhite /> : <Logo />}

                    <nav className="mx-[40px] flex gap-[10px]">
                        <LinkHeader href="#">{t("profile.headers.topFreelancers")}</LinkHeader>
                        <LinkHeader href="#">{t("profile.headers.findWork")}</LinkHeader>
                        <LinkHeader href="#">{t("profile.headers.aboutUs")}</LinkHeader>
                        <LinkHeader href="#">{t("profile.headers.faq")}</LinkHeader>
                        <LinkHeader href="#">{t("profile.headers.payments")}</LinkHeader>
                        <LinkHeader href="#">{t("profile.headers.contacts")}</LinkHeader>
                    </nav>

                    <nav className="flex gap-[20px] mr-[20px]">
                        <LinkHeader href={width < 1040 ? "#" : `/${locale}/login`}>{t("profile.headers.login")}</LinkHeader>
                        <LinkHeader onClick={width < 1040 ? () => setIsOpenReg(true) : () => { }} href={width < 1040 ? "#" : `/${locale}/registration`}>{t("profile.headers.signup")}</LinkHeader>
                    </nav>

                    <div className="flex gap-[12px] items-center mr-[20px]">
                        <ButtonGradientSmall
                            text={t("profile.headers.postProject")}
                            onClick={() => { }}
                        />
                        <LangButton />
                    </div>
                    <ThemeButton />
                </div>
            </header>
            {isOpenReg && <RegModal maxWidth={width} setIsOpen={setIsOpenReg} />}
        </>
    );
}
