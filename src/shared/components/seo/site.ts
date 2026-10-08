export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://workzora.com").replace(/\/+$/, "");
export const LOCALES = ["en", "uk"] as const;
export const DEFAULT_LOCALE = "en";

export const PRIVATE_PATHS = [
    "/profile",
    "/chats",
    "/activeProjects",
    "/security",
    "/notifications",
    "/payment",
    "/payment-data",
    "/payments",
    "/review",
    "/support",
    "/create-project",
    "/newsletter",
    "/login",
    "/registration",
    "/forgot-password",
    "/coming-soon",
    "/404",
];

export const isPrivatePath = (path: string) => PRIVATE_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

export const localizedUrl = (path: string, locale: string) => {
    const clean = path === "/" ? "" : path;
    return `${SITE_URL}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${clean}` || SITE_URL;
};
