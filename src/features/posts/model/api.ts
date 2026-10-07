import { $api } from "@/shared/components/http";
import { isAxiosError } from "axios";
import type { PaginatedPosts, PostListQuery } from "./types-paginated-posts";
import { Post } from "./types";


export const getAllPosts = async ({ page, limit, tag, exclude }: PostListQuery): Promise<PaginatedPosts> =>
    (await $api.get<PaginatedPosts>("/posts", { params: { page, limit, ...(tag && { tag }), ...(exclude && { exclude }) } })).data;

export const getPopularPosts = async (): Promise<Post[]> => (await $api.get<Post[]>("/posts/popular")).data;

export const addPostView = async (id: string) => (await $api.post(`/posts/${id}/view`)).data;

export const subscribeToBlog = async (body: { email: string; locale: string }) => (await $api.post("/newsletter/subscribe", body)).data;

export const unsubscribeFromBlog = async (token: string): Promise<{ success: boolean }> =>
    (await $api.post<{ success: boolean }>("/newsletter/unsubscribe", { token })).data;


export const getPost = async (id: string) => {
    if (!id) return;

    const res = await $api.get(`/posts/${id}`);

    return res.data;
};


export const getLatestPosts = async () => {
    const res = await $api.get("/posts/latest");

    return res.data;
};


export const searchPosts = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === "") {
        return [];
    }

    const res = await $api.get("/posts/search", {
        params: {
            searchTerm,
        },
    });

    return res.data;
};

export type PostLookup = { status: "found"; post: Post } | { status: "missing" } | { status: "unavailable" };

export const findPostForPage = async (idOrSlug: string, baseURL?: string): Promise<PostLookup> => {
    try {
        const res = await $api.get<Post>(`/posts/${encodeURIComponent(idOrSlug)}`, baseURL ? { baseURL } : undefined);
        return { status: "found", post: res.data };
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) return { status: "missing" };
        return { status: "unavailable" };
    }
};
