import Logo from "@/componenst/svg/Logo";
import LogoRegWhite from "@/componenst/svg/LogoRegWhite";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGradientSmall from "../Button/ButtonGradientSmall";
import LangButton from "../Button/LangButton";
import ThemeButton from "../Button/ThemeButton";
import ButtonBurger from "../Button/ButtonBurger";
import LinkHeader from "../Link/LinkHeader";
import RegModal from "../Modal/RegModal";

export default function Header() {
    const { theme } = useTheme();
    const { t } = useTranslation("common");
    const router = useRouter();

    const [isOpenReg, setIsOpenReg] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [width, setWidth] = useState(0);

    const [burgerOpen, setBurgerOpen] = useState(false); // стан бургер-меню

    useEffect(() => {
        setMounted(true);
        setWidth(window.innerWidth);

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!mounted) return null;

    const locale = router.locale || "en";
    const isMobile = width < 1257;

    return (
        <>
            <header className="w-full bg-bg-header dark:bg-bg-dark box z-10" style={{ boxShadow: "0px 0px 20px #7EA310" }}>
                <div className="w-full flex items-center justify-between px-4 py-4">
                    {/* Logo */}
                    {theme === "dark" ? <LogoRegWhite /> : <Logo />}

                    {/* Якщо не мобільний, повне меню */}
                    {!isMobile && (
                        <>
                            <nav className="mx-[40px] flex gap-[10px]">
                                <LinkHeader href="#">{t("profile.headers.topFreelancers")}</LinkHeader>
                                <LinkHeader href="#">{t("profile.headers.findWork")}</LinkHeader>
                                <LinkHeader href="#">{t("profile.headers.aboutUs")}</LinkHeader>
                                <LinkHeader href="#">{t("profile.headers.faq")}</LinkHeader>
                                <LinkHeader href="#">{t("profile.headers.payments")}</LinkHeader>
                                <LinkHeader href="#">{t("profile.headers.contacts")}</LinkHeader>
                            </nav>

                            <nav className="flex gap-[20px] mr-[20px]">
                                <LinkHeader href={`/${locale}/login`}>{t("profile.headers.login")}</LinkHeader>
                                <LinkHeader onClick={() => { }} href={`/${locale}/registration`}>{t("profile.headers.signup")}</LinkHeader>
                            </nav>

                            <div className="flex gap-[12px] items-center mr-[20px]">
                                <ButtonGradientSmall text={t("profile.headers.postProject")} onClick={() => { }} />
                                <LangButton />
                            </div>

                            <ThemeButton />
                        </>
                    )}

                    {/* Для мобільного - бургер */}
                    {isMobile && (
                        <div className="flex items-center gap-4">
                            <ButtonGradientSmall text={t("profile.headers.postProject")} onClick={() => { }} />
                            <ButtonBurger text={<></>} isOpen={burgerOpen} onClick={() => setBurgerOpen(!burgerOpen)} />
                        </div>
                    )}
                </div>

                {/* Мобільне меню */}
                {isMobile && burgerOpen && (
                    <div className="flex flex-col gap-4 p-4 bg-bg-header dark:bg-bg-dark">
                        <nav className="flex flex-wrap justify-between">
                            <LinkHeader href="#">{t("profile.headers.topFreelancers")}</LinkHeader>
                            <LinkHeader href="#">{t("profile.headers.findWork")}</LinkHeader>
                            <LinkHeader href="#">{t("profile.headers.aboutUs")}</LinkHeader>
                            <LinkHeader href="#">{t("profile.headers.faq")}</LinkHeader>
                            <LinkHeader href="#">{t("profile.headers.payments")}</LinkHeader>
                            <LinkHeader href="#">{t("profile.headers.contacts")}</LinkHeader>
                            <LinkHeader href={`/${locale}/login`}>{t("profile.headers.login")}</LinkHeader>
                            <LinkHeader onClick={() => setIsOpenReg(true)} href="#">{t("profile.headers.signup")}</LinkHeader>
                        </nav>
                        <div className="flex gap-2">
                            <LangButton />
                            <ThemeButton />
                        </div>
                    </div>
                )}
            </header>

            {isOpenReg && <RegModal maxWidth={width} setIsOpen={setIsOpenReg} />}
        </>
    );
}
