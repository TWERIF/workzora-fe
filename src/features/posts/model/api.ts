import { $api } from "@/shared/components/http";
import { isAxiosError } from "axios";
import { Post } from "./types";


export const getAllPosts = async (
    page: number = 1,
    limit: number = 10,
) => {
    const res = await $api.get("/posts", {
        params: {
            page,
            limit,
        },
    });

    return res.data;
};


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
