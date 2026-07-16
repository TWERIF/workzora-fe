import { useAuth } from "@/features/auth/model/useAuth";
import LoginModal from "@/features/auth/ui/LoginModal";
import RegModal from "@/features/auth/ui/RegModal";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../svg/Logo";
import LogoRegWhite from "../../svg/LogoRegWhite";
import ButtonBurger from "../Button/ButtonBurger";
import ButtonGradientSmall from "../Button/ButtonGradientSmall";
import LangButton from "../Button/LangButton";
import ThemeButton from "../Button/ThemeButton";
import LinkHeader from "../Link/LinkHeader";

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9.75a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.75 15c0-2.9 2.35-4.5 5.25-4.5s5.25 1.6 5.25 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* Висота "обгортки" хедера (padding + пігулка) — використовується для spacer'а під контентом.
   Якщо зміните py-4 / py-3 нижче — синхронізуйте це значення. */
const HEADER_SPACER_CLASS = "h-[92px] display-none";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const [isOpenReg, setIsOpenReg] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const init = () => {
      setMounted(true);
      setWidth(window.innerWidth);
    };
    init();
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Легка зміна тіні/розміру при скролі — для відчуття "плавності"
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  const locale = router.locale || "en";
  const isMobile = width < 1233;
  const isVerySmall = width <= 414;

  const isFreelancer = user?.role === "freelancer";

  const buttonText = isFreelancer
    ? t("profile.headers.findWork")
    : t("profile.headers.postProject");

  const buttonLink = isFreelancer
    ? `/${locale}/projects`
    : `/${locale}/create-project`;

  const navLinks = (
    <>
      <LinkHeader href={`/${locale}/freelancers`}>
        <span className="flex items-center gap-1">
          {t("profile.headers.topFreelancers")}
          <ChevronIcon />
        </span>
      </LinkHeader>
      {user?.role !== "client" && (
        <LinkHeader href={`/${locale}/categories`}>
          <span className="flex items-center gap-1">
            {t("profile.headers.findWork")}
            <ChevronIcon />
          </span>
        </LinkHeader>
      )}
      <LinkHeader href={`/${locale}/about-us`}>{t("profile.headers.aboutUs")}</LinkHeader>
      <LinkHeader href={`/${locale}/faq`}>{t("profile.headers.faq")}</LinkHeader>
      <LinkHeader href={`/${locale}/payments`}>{t("profile.headers.payments")}</LinkHeader>
      <LinkHeader href={`/${locale}/contacts`}>{t("profile.headers.contacts")}</LinkHeader>
    </>
  );

  return (
    <>
      {/* FIXED-обгортка: тепер хедер завжди над контентом і "їде" разом зі скролом */}
      <div className="fixed inset-x-0 top-0 z-[9998]">
        <div className="max-w-[1400px] mx-auto px-4 pt-4">
          <header
            className={`w-full max-w-[1400px] mx-auto rounded-full bg-white dark:bg-bg-dark transition-shadow duration-300 ease-in-out ${scrolled
              ? "shadow-[0px_10px_30px_rgba(0,0,0,0.35)]"
              : "shadow-[0px_6px_18px_rgba(0,0,0,0.2)]"
              }`}
          >
            <div className="w-full flex items-center justify-between gap-4 px-6 py-3">
              <Link href="/" className="flex-shrink-0">
                {isDark ? <LogoRegWhite /> : <Logo />}
              </Link>

              {!isMobile && (
                <>
                  <nav className="flex items-center gap-6 text-text dark:text-white">{navLinks}</nav>

                  <div className="flex items-center gap-4 ml-auto">
                    {isAuthenticated ? (
                      <LinkHeader href={`/${locale}/profile`}>
                        <span className="flex items-center gap-1.5">
                          <UserIcon />
                          {t("profile.headers.profile")}
                        </span>
                      </LinkHeader>
                    ) : (
                      <div className="flex items-center gap-4">
                        <LinkHeader onClick={() => setIsOpenLogin(true)} href="#">
                          {t("profile.headers.login")}
                        </LinkHeader>
                        <LinkHeader href={`/${locale}/registration`}>
                          {t("profile.headers.signup")}
                        </LinkHeader>
                      </div>
                    )}

                    <Link href={buttonLink}>
                      <ButtonGradientSmall text={buttonText} onClick={() => { }} />
                    </Link>

                    <LangButton />
                    <ThemeButton />
                  </div>
                </>
              )}

              {isMobile && (
                <div className="flex items-center gap-3 flex-shrink-0">
                  {!isVerySmall && (
                    <Link href={buttonLink} className="flex-shrink-0">
                      <ButtonGradientSmall text={buttonText} onClick={() => { }} />
                    </Link>
                  )}
                  <div className="flex-shrink-0">
                    <ButtonBurger
                      text={<></>}
                      isOpen={burgerOpen}
                      onClick={() => setBurgerOpen(!burgerOpen)}
                    />
                  </div>
                </div>
              )}
            </div>
          </header>

          {isMobile && burgerOpen && (
            <div className="w-full max-w-[1400px] mx-auto mt-3 rounded-3xl bg-white dark:bg-bg-dark shadow-[0px_10px_30px_rgba(0,0,0,0.15)] px-6 py-6 max-h-[calc(100vh-110px)] overflow-y-auto">
              <nav className="flex flex-col items-center gap-5 text-center text-text dark:text-text-dark">
                {navLinks}

                {isAuthenticated ? (
                  <LinkHeader href={`/${locale}/profile`}>
                    <span className="flex items-center gap-1.5">
                      <UserIcon />
                      {t("profile.headers.profile")}
                    </span>
                  </LinkHeader>
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

              <div className="flex flex-col items-center gap-4 mt-6">
                {isVerySmall && (
                  <Link href={buttonLink} className="w-full">
                    <ButtonGradientSmall text={buttonText} onClick={() => { }} />
                  </Link>
                )}
                <div className="flex items-center gap-4">
                  <LangButton />
                  <ThemeButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Spacer: компенсує вилучення хедера з потоку документа через fixed */}
      {/* <div className={HEADER_SPACER_CLASS} aria-hidden="true" /> */}

      {isOpenReg && (
        <RegModal maxWidth={width} setIsOpen={setIsOpenReg} setIsOpenLogin={setIsOpenLogin} />
      )}
      {isOpenLogin && (
        <LoginModal maxWidth={width} setIsOpen={setIsOpenLogin} setIsOpenReg={setIsOpenReg} />
      )}
    </>
  );
}