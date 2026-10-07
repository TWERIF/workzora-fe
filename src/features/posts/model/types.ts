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

export const postPath = (post: Pick<Post, "id" | "slug">) => `/news/${post.slug || post.id}`;
