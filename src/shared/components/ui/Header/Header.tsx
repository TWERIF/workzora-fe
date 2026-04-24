import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonBurger from "../Button/ButtonBurger";
import ButtonGradientSmall from "../Button/ButtonGradientSmall";
import LangButton from "../Button/LangButton";
import ThemeButton from "../Button/ThemeButton";
import LinkHeader from "../Link/LinkHeader";
import Logo from "../../svg/Logo";
import LogoRegWhite from "../../svg/LogoRegWhite";
import RegModal from "@/features/auth/ui/RegModal";
import LoginModal from "@/features/auth/ui/LoginModal";
import Link from "next/link";
import { useAuth } from "@/features/auth/model/useAuth";

export default function Header() {
  const { theme } = useTheme();
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isAuthenticated, user } = useAuth(); // Отримуємо стан авторизації та дані юзера

  const [isOpenReg, setIsOpenReg] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    const init = () => {
      setMounted(true);
      setWidth(window.innerWidth);
    };
    init();
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const locale = router.locale || "en";
  const isMobile = width < 1233;
  const isVerySmall = width <= 414;

  // Визначаємо роль та параметри головної кнопки
  const isFreelancer = user?.role === "freelancer";

  const buttonText = isFreelancer
    ? t("profile.headers.findWork")
    : t("profile.headers.postProject");

  const buttonLink = isFreelancer
    ? `/${locale}/projects`
    : `/${locale}/create-project`;

  return (
    <>
      <header
        className="w-full bg-bg-header dark:bg-bg-dark box z-100"
        style={{ boxShadow: "0px 0px 20px #7EA310" }}
      >
        <div className="w-full flex items-center justify-between px-2 py-4">
          {/* Logo */}
          <Link href="/">{theme === "dark" ? <LogoRegWhite /> : <Logo />}</Link>

          {!isMobile && (
            <>
              <nav className="mx-[40px] flex gap-2.5">
                <LinkHeader href={`/${locale}/freelancers`}>
                  {t("profile.headers.topFreelancers")}
                </LinkHeader>
                <LinkHeader href={`/${locale}/clients`}>
                  {t("profile.headers.findWork")}
                </LinkHeader>
                <LinkHeader href="#">{t("profile.headers.aboutUs")}</LinkHeader>
                <LinkHeader href="#">{t("profile.headers.faq")}</LinkHeader>
                <LinkHeader href="#">
                  {t("profile.headers.payments")}
                </LinkHeader>
                <LinkHeader href="#">
                  {t("profile.headers.contacts")}
                </LinkHeader>
              </nav>

              {isAuthenticated ? (
                <div className="flex gap-3">
                  <LinkHeader href={`/${locale}/profile`}>
                    {t("profile.headers.profile")}
                  </LinkHeader>
                  <LinkHeader href={`/${locale}/activeProjects`}>
                    {t("profile.headers.activeProjects")}
                  </LinkHeader>
                </div>
              ) : (
                <nav className="flex gap-2.5 mr-[20px]">
                  <LinkHeader onClick={() => setIsOpenLogin(true)} href={`#`}>
                    {t("profile.headers.login")}
                  </LinkHeader>
                  <LinkHeader href={`/${locale}/registration`}>
                    {t("profile.headers.signup")}
                  </LinkHeader>
                </nav>
              )}

              <div className="flex gap-[12px] items-center mr-[20px]">
                <Link href={buttonLink}>
                  <ButtonGradientSmall text={buttonText} onClick={() => {}} />
                </Link>
                <LangButton />
              </div>

              <ThemeButton />
            </>
          )}

          {/* Для мобільного - бургер */}
          {isMobile && (
            <div className="flex items-center gap-4">
              {!isVerySmall && (
                <Link href={buttonLink}>
                  <ButtonGradientSmall text={buttonText} onClick={() => {}} />
                </Link>
              )}
              <ButtonBurger
                text={<></>}
                isOpen={burgerOpen}
                onClick={() => setBurgerOpen(!burgerOpen)}
              />
            </div>
          )}
        </div>

        {/* Мобільне меню */}
        {isMobile && burgerOpen && (
          <div className="flex flex-col gap-4 p-4 bg-bg-header dark:bg-bg-dark border-t border-gray-100 dark:border-zinc-800">
            <nav className="flex flex-wrap justify-between gap-2">
              <LinkHeader href={`/${locale}/freelancers`}>
                {t("profile.headers.topFreelancers")}
              </LinkHeader>
              <LinkHeader href={`/${locale}/clients`}>
                {t("profile.headers.findWork")}
              </LinkHeader>
              <LinkHeader href="#">{t("profile.headers.aboutUs")}</LinkHeader>
              <LinkHeader href="#">{t("profile.headers.faq")}</LinkHeader>
              {isAuthenticated ? (
                <>
                  <LinkHeader href={`/${locale}/profile`}>
                    {t("profile.headers.profile")}
                  </LinkHeader>
                  <LinkHeader href={`/${locale}/activeProjects`}>
                    {t("profile.headers.activeProjects")}
                  </LinkHeader>
                </>
              ) : (
                <>
                  <LinkHeader onClick={() => setIsOpenLogin(true)} href="#">
                    {t("profile.headers.login")}
                  </LinkHeader>
                  <LinkHeader href={`/${locale}/registration`}>
                    {t("profile.headers.signup")}
                  </LinkHeader>
                </>
              )}
            </nav>

            <div className="flex flex-col gap-4">
              {isVerySmall && (
                <Link href={buttonLink} className="w-full">
                  <ButtonGradientSmall text={buttonText} onClick={() => {}} />
                </Link>
              )}
              <div className="flex items-center gap-4">
                <LangButton />
                <ThemeButton />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Модальні вікна */}
      {isOpenReg && (
        <RegModal
          maxWidth={width}
          setIsOpen={setIsOpenReg}
          setIsOpenLogin={setIsOpenLogin}
        />
      )}
      {isOpenLogin && (
        <LoginModal
          maxWidth={width}
          setIsOpen={setIsOpenLogin}
          setIsOpenReg={setIsOpenReg}
        />
      )}
    </>
  );
}
