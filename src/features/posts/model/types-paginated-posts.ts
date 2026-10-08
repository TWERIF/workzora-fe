import type { Post } from "./types";

export interface PaginatedPosts {
    data: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PostListQuery {
    page: number;
    limit: number;
    tag?: string | null;
    exclude?: string;
}
