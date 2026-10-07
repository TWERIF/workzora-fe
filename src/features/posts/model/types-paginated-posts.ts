import type { Post } from "./types";

export interface PaginatedPosts {
    items: Post[];
    totalPages: number;
}
