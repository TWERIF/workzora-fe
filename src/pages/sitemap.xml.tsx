import { API_URL } from "@/shared/components/http";
import { DEFAULT_LOCALE, detectContentLocale, LOCALES, localizedUrl } from "@/shared/components/seo/site";
import type { GetServerSideProps } from "next";

const STATIC_PATHS = [
    "/",
    "/categories",
    "/top-projects",
    "/freelancers",
    "/top-clients",
    "/news",
    "/knowledgebase",
    "/about-us",
    "/faq",
    "/fees",
    "/contacts",
    "/pro",
    "/privacy-policy",
    "/terms-and-conditions",
    "/code-of-conduct",
    "/copyright-policy",
];

const HELP_CATEGORIES = [
    "getting-started",
    "for-clients",
    "for-freelancers",
    "payments-escrow",
    "projects-proposals",
    "account-settings",
    "safety-arbitration",
    "technical-support",
];

interface Entry {
    path: string;
    locales: readonly string[];
    lastmod?: string;
}

const apiBase = () => (process.env.API_INTERNAL_URL || API_URL).replace(/\/+$/, "");

const getJson = async <T,>(path: string): Promise<T | null> => {
    try {
        const res = await fetch(`${apiBase()}${path}`, { signal: AbortSignal.timeout(5000) });
        return res.ok ? ((await res.json()) as T) : null;
    } catch {
        return null;
    }
};

const getAllPages = async <T,>(path: string, maxPages = 20): Promise<T[]> => {
    const items: T[] = [];
    const separator = path.includes("?") ? "&" : "?";
    for (let page = 1; page <= maxPages; page++) {
        const data = await getJson<{ data: T[]; totalPages: number }>(`${path}${separator}page=${page}&limit=50`);
        if (!data) break;
        items.push(...data.data);
        if (page >= data.totalPages) break;
    }
    return items;
};

const blogEntries = async (): Promise<Entry[]> => {
    const posts = await getAllPages<{ id: string; slug?: string | null; title: string; teaser?: string; updatedAt: string }>("/posts");
    return posts.map((post) => ({
        path: `/news/${post.slug || post.id}`,
        locales: [detectContentLocale(`${post.title} ${post.teaser ?? ""}`)],
        lastmod: post.updatedAt,
    }));
};

const projectEntries = async (): Promise<Entry[]> => {
    const projects = await getAllPages<{ id: string; title: string; description: string; updatedAt: string }>("/projects");
    return projects.map((project) => ({
        path: `/activeProjects/discussion/${project.id}`,
        locales: [detectContentLocale(`${project.title} ${project.description}`)],
        lastmod: project.updatedAt,
    }));
};

const profileEntries = async (): Promise<Entry[]> => {
    const [freelancers, clients] = await Promise.all([
        getAllPages<{ id: string }>("/users/freelancers"),
        getAllPages<{ id: string }>("/users/clients/top"),
    ]);
    const ids = [...new Set([...freelancers, ...clients].map((user) => user.id))];
    return ids.map((id) => ({ path: `/public-profile/${id}`, locales: LOCALES }));
};

const helpEntries = async (): Promise<Entry[]> => {
    const entries: Entry[] = HELP_CATEGORIES.map((category) => ({ path: `/knowledgebase/${category}`, locales: LOCALES }));
    for (const locale of LOCALES) {
        for (const category of HELP_CATEGORIES) {
            const articles = await getJson<{ category: string; slug: string; updatedAt: string }[]>(`/help/articles?locale=${locale}&category=${category}`);
            articles?.forEach((article) => entries.push({ path: `/knowledgebase/${article.category}/${article.slug}`, locales: [locale], lastmod: article.updatedAt }));
        }
    }
    return entries;
};

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const renderEntry = ({ path, locales, lastmod }: Entry) =>
    locales
        .map((locale) => {
            const alternates =
                locales.length > 1
                    ? [...locales.map((item) => `<xhtml:link rel="alternate" hreflang="${item}" href="${escapeXml(localizedUrl(path, item))}"/>`), `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(path, DEFAULT_LOCALE))}"/>`].join("")
                    : "";
            return `<url><loc>${escapeXml(localizedUrl(path, locale))}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}${alternates}</url>`;
        })
        .join("");

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [blog, help, projects, profiles] = await Promise.all([blogEntries(), helpEntries(), projectEntries(), profileEntries()]);
    const entries: Entry[] = [...STATIC_PATHS.map((path) => ({ path, locales: LOCALES })), ...blog, ...help, ...projects, ...profiles];
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.map(renderEntry).join("")}</urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.write(xml);
    res.end();
    return { props: {} };
};

export default function Sitemap() {
    return null;
}
