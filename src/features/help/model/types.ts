export const HELP_CATEGORIES = [
    { slug: "getting-started", key: "gettingStarted" },
    { slug: "for-clients", key: "forClients" },
    { slug: "for-freelancers", key: "forFreelancers" },
    { slug: "payments-escrow", key: "paymentsEscrow" },
    { slug: "projects-proposals", key: "projectsProposals" },
    { slug: "account-settings", key: "accountSettings" },
    { slug: "safety-arbitration", key: "safetyArbitration" },
    { slug: "technical-support", key: "technicalSupport" },
] as const;

export type HelpCategorySlug = (typeof HELP_CATEGORIES)[number]["slug"];
export type HelpReaction = "yes" | "maybe" | "no";

export const helpCategoryKey = (slug?: string) => HELP_CATEGORIES.find((item) => item.slug === slug)?.key;

export interface HelpCategoryCount {
    key: HelpCategorySlug;
    count: number;
}

export interface HelpArticleSummary {
    id: string;
    category: HelpCategorySlug;
    slug: string;
    locale: string;
    title: string;
    summary: string;
    position: number;
    minutesToRead: number;
    updatedAt: string;
}

export interface HelpArticle extends HelpArticleSummary {
    body: string;
}

export const helpArticlePath = (article: Pick<HelpArticleSummary, "category" | "slug">) => `/knowledgebase/${article.category}/${article.slug}`;
