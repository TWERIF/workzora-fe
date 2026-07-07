import type { Post } from "./types";

// `getAllPosts` / `usePostList` return `res.data` typed as `any` today.
// This page assumes a shape of `{ items, totalPages }` for pagination to
// work — adjust this (and the two spots that read `data.items` /
// `data.totalPages`) to match whatever your `/posts` endpoint actually
// returns.
export interface PaginatedPosts {
    items: Post[];
    totalPages: number;
}
