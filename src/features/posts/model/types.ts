export const BLOG_TAGS = [
    { value: "freelance", key: "freelance" },
    { value: "marketing", key: "marketing" },
    { value: "ai", key: "ai" },
    { value: "telegram", key: "telegram" },
    { value: "case-studies", key: "caseStudies" },
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number]["value"];

export const blogTagKey = (tag?: string | null) => BLOG_TAGS.find((item) => item.value === tag)?.key;

export interface Post {
    id: string;
    userId: string;
    title: string;
    slug?: string | null;
    teaser: string;
    imageUrl: string;
    article: string;
    minutesToRead: number;
    tag?: string;
    views?: number;
    createdAt: string;
    updatedAt: string;
}

export const postPath = (post: Pick<Post, "id" | "slug">) => `/news/${post.slug || post.id}`;
