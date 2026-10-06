export interface Post {
    id: string;
    userId: string;
    title: string;
    slug?: string | null;
    teaser: string;
    imageUrl: string;
    article: string;
    minutesToRead:number;   
    createdAt: string;
    updatedAt: string;
}

// Readable link to the post; falls back to the id for posts without a slug yet.
export const postPath = (post: Pick<Post, "id" | "slug">) => `/news/${post.slug || post.id}`;
