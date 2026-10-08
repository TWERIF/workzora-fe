import { PRIVATE_PATHS, SITE_URL } from "@/shared/components/seo/site";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const disallow = PRIVATE_PATHS.flatMap((path) => [`Disallow: ${path}`, `Disallow: /uk${path}`]);
    const body = ["User-agent: *", "Allow: /", ...disallow, "", `Sitemap: ${SITE_URL}/sitemap.xml`, ""].join("\n");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.write(body);
    res.end();
    return { props: {} };
};

export default function Robots() {
    return null;
}
