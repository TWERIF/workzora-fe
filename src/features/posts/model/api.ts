import { $api } from "@/shared/components/http";


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