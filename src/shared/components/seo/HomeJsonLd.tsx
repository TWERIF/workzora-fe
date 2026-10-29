import Head from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE, localizedUrl, SITE_URL } from "./site";

export default function HomeJsonLd() {
    const { locale = DEFAULT_LOCALE } = useRouter();
    const data = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "WorkZora",
            url: SITE_URL,
            logo: `${SITE_URL}/icon-512.png`,
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "WorkZora",
            url: localizedUrl("/", locale),
            inLanguage: locale,
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
    ];

    return (
        <Head>
            <script key="ld-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        </Head>
    );
}
