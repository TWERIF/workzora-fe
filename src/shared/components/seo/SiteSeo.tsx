import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE, isPrivatePath, LOCALES, localizedUrl, SITE_URL } from "./site";

const OG_LOCALE: Record<string, string> = { en: "en_US", uk: "uk_UA" };

const ROUTE_KEYS: Record<string, string> = {
    "/404": "notFound",
    "/activeProjects": "activeProjects",
    "/newsletter/unsubscribe": "unsubscribe",
    "/payment": "payment",
    "/payment-data": "finances",
    "/payments": "payments",
    "/profile": "profile",
    "/profile/settings": "profileSettings",
    "/review/[projectId]": "review",
};

export default function SiteSeo({ locales }: { locales?: string[] }) {
    const { t } = useTranslation("seo");
    const { asPath, pathname, locale = DEFAULT_LOCALE } = useRouter();
    const routeKey = ROUTE_KEYS[pathname];
    const path = asPath.split(/[?#]/)[0] || "/";
    const pageLocales = locales?.length ? locales : [...LOCALES];
    const canonicalLocale = pageLocales.includes(locale) ? locale : pageLocales[0];
    const defaultLocale = pageLocales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : pageLocales[0];
    const canonical = localizedUrl(path, canonicalLocale);
    const hidden = isPrivatePath(path) || pathname === "/404" || pathname === "/_error";

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {routeKey && <title key="title">{`${t(`${routeKey}.title`)} | Workzora`}</title>}
            {routeKey && <meta key="description" name="description" content={t(`${routeKey}.description`)} />}
            {hidden ? (
                <meta key="robots" name="robots" content="noindex, nofollow" />
            ) : (
                <>
                    <link key="canonical" rel="canonical" href={canonical} />
                    {pageLocales.map((item) => (
                        <link key={`alternate-${item}`} rel="alternate" hrefLang={item} href={localizedUrl(path, item)} />
                    ))}
                    <link key="alternate-default" rel="alternate" hrefLang="x-default" href={localizedUrl(path, defaultLocale)} />
                </>
            )}
            <meta key="og:site_name" property="og:site_name" content="WorkZora" />
            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:url" property="og:url" content={canonical} />
            <meta key="og:locale" property="og:locale" content={OG_LOCALE[locale] ?? OG_LOCALE.en} />
            <meta key="og:image" property="og:image" content={`${SITE_URL}/icon-512.png`} />
            <meta key="twitter:card" name="twitter:card" content="summary" />
        </Head>
    );
}
