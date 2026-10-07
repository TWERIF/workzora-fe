import { useAuth } from "@/features/auth/model/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IconHeaderClose from "../../svg/IconHeaderClose";
import { IconPerson } from "../../svg/IconPerson";
import Logo from "../../svg/Logo";
import LogoRegWhite from "../../svg/LogoRegWhite";
import LangButtonNew from "../Button/LangButtonNew";
import ThemeButton from "../Button/ThemeButton";
import LinkHeader from "../Link/LinkHeader";


const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-200 group-hover:rotate-180"
  >
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type NavDropdownLink = { label: string; href: string };

const MobileNavAccordionItem = ({
  label,
  items,
}: {
  label: React.ReactNode;
  items: NavDropdownLink[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-center gap-1 py-1"
      >
        {label}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </span>
      </button>
      {open && (
        <div className="mt-2 flex flex-col items-center gap-3 pb-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-text/80 dark:text-text-dark/80">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavDropdownItem = ({
  label,
  items,
}: {
  label: React.ReactNode;
  items: NavDropdownLink[];
}) => (
  <div className="relative group">
    <button
      type="button"
      className="flex items-center gap-1 rounded-full px-3 py-1.5 -mx-3 -my-1.5 transition-colors duration-200 group-hover:bg-success/10 group-hover:text-success"
    >
      {label}
      <ChevronIcon />
    </button>

    <div className="absolute left-1/2 top-[100%] z-50 hidden -translate-x-1/2 pt-2 group-hover:block">
      <div className="min-w-[190px] overflow-hidden rounded-2xl bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.15)] dark:bg-bg-dark">
        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2.5 text-sm text-text transition-colors duration-150 hover:bg-success/10 hover:text-success dark:text-white ${index === 0 ? "rounded-t-2xl pt-3" : ""
              } ${index === items.length - 1 ? "rounded-b-2xl pb-3" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const GridDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9.75a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.75 15c0-2.9 2.35-4.5 5.25-4.5s5.25 1.6 5.25 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const [burgerOpen, setBurgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setBurgerOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const locale = router.locale || "en";

  const forClientsItems: NavDropdownLink[] = [
    { label: t("profile.headers.topFreelancers"), href: `/${locale}/freelancers` },
    { label: t("profile.headers.postProject"), href: `/${locale}/create-project` },
    { label: t("profile.headers.contacts"), href: `/${locale}/contacts` },
    { label: t("profile.headers.news"), href: `/${locale}/news` },
  ];

  const forFreelancersItems: NavDropdownLink[] = [
    { label: t("profile.headers.topProjects"), href: `/${locale}/top-projects` },
    { label: t("profile.headers.topClients"), href: `/${locale}/top-clients` },
    { label: t("profile.headers.categories"), href: `/${locale}/categories` },
    { label: t("profile.headers.contests"), href: `/${locale}/coming-soon` },
    { label: t("profile.headers.contacts"), href: `/${locale}/contacts` },
    { label: t("profile.headers.news"), href: `/${locale}/news` },
  ];

  const showFreelancerMenu = user?.role !== "client";

  const logo = (
    <Link href="/" className="flex-shrink-0" aria-label="WorkZora">
      <span className="dark:hidden">
        <Logo />
      </span>
      <span className="hidden dark:block">
        <LogoRegWhite />
      </span>
    </Link>
  );

  const account = (
    <div className="flex gap-1.5 items-center">
      <Link href={`/${locale}/profile`} aria-label={t("profile.headers.profile")}>
        <span className="flex items-center gap-1.5">
          {user?.avatarUrl ? <img className="w-11 h-11 rounded-full object-cover" src={user.avatarUrl} alt="" /> : <UserIcon />}
        </span>
      </Link>
      <button type="button" className="text-text-light text-[16px] transition-all rounded-[8px]" onClick={() => void logout()}>
        {t("profile.headers.logout")}
      </button>
    </div>
  );

  return (
    <>
      {burgerOpen && (
        <div className="fixed inset-0 z-[9997] w-screen h-screen bg-white dark:bg-bg-dark overflow-y-auto min-[850px]:hidden">
          <div className="flex min-h-full flex-col items-center px-6 pt-[108px] pb-8">
            <nav className="flex flex-col items-center gap-5 text-center text-text dark:text-text-dark">
              <MobileNavAccordionItem label={t("profile.headers.for_clients")} items={forClientsItems} />
              {showFreelancerMenu && (
                <MobileNavAccordionItem label={t("profile.headers.for_freelancers")} items={forFreelancersItems} />
              )}

              {isAuthenticated ? (
                account
              ) : (
                <>
                  <LinkHeader href={`/${locale}/login`}>{t("profile.headers.login")}</LinkHeader>
                  <LinkHeader href={`/${locale}/registration`}>{t("profile.headers.signup")}</LinkHeader>
                </>
              )}
            </nav>

            <div className="mt-4">
              <LangButtonNew />
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-6 flex justify-center">
            <ThemeButton />
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 top-0 z-[9998]">
        <div className="max-w-[1400px] mx-auto px-4 mt-4">
          <header
            className={`w-full max-w-[1400px] mx-auto rounded-[36px] bg-white dark:bg-bg-dark transition-shadow duration-300 ease-in-out ${scrolled
              ? "shadow-[0px_10px_30px_rgba(0,0,0,0.35)]"
              : "shadow-[0px_6px_18px_rgba(0,0,0,0.2)]"
              }`}
          >
            <div className="w-full flex items-center justify-between gap-4 px-6 py-3 min-[850px]:hidden">
              <button
                type="button"
                onClick={() => setBurgerOpen((prev) => !prev)}
                aria-label={burgerOpen ? "Close menu" : "Open menu"}
                aria-expanded={burgerOpen}
                className="flex-shrink-0 text-success"
              >
                {burgerOpen ? <IconHeaderClose /> : <GridDotsIcon />}
              </button>

              {logo}

              <Link
                href={`/${locale}/${isAuthenticated ? "profile" : "login"}`}
                aria-label={t(isAuthenticated ? "profile.headers.profile" : "profile.headers.login")}
                className="flex-shrink-0 text-success"
              >
                <IconPerson />
              </Link>
            </div>

            <div className="hidden w-full items-center justify-between gap-4 px-6 py-3 min-[850px]:flex">
              {logo}

              <nav className="flex items-center gap-6 text-text dark:text-white">
                <NavDropdownItem label={t("profile.headers.for_clients")} items={forClientsItems} />
                {showFreelancerMenu && (
                  <NavDropdownItem label={t("profile.headers.for_freelancers")} items={forFreelancersItems} />
                )}
              </nav>

              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    {account}
                    {(user?.role === "client" || user?.role === "freelancer") && (
                      <Link
                        href={`/${locale}/${user.role === "client" ? "create-project" : "categories"}`}
                        className="flex h-[42px] items-center rounded-full bg-gradient px-5 text-sm text-white transition-opacity hover:opacity-90"
                      >
                        {t(user.role === "client" ? "profile.headers.postProject" : "profile.headers.findJob")}
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <LinkHeader hover={false} className="flex items-center gap-2 hover:fill-success hover:text-success" href={`/${locale}/login`}>
                      {t("profile.headers.login")}
                    </LinkHeader>

                    <div className="w-[1px] h-[10px] bg-[#E2E2E2] dark:bg-[#444444]" />

                    <LinkHeader hover={false} className="flex items-center gap-2 hover:fill-success hover:text-success" href={`/${locale}/registration`}>
                      {t("profile.headers.signup")}
                    </LinkHeader>
                  </div>
                )}

                <LangButtonNew />
                <ThemeButton />
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
