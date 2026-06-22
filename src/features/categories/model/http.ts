import { $api } from "@/shared/components/http";
import { Category } from "./types";

export const findAll = async ({ page = 1, limit = 20 }: { page: number, limit: number }): Promise<{ items: Category[] }> => {
    return (await $api.get("/categories", {
        params: {
            page,
            limit
        }
    })).data;
}

export const findOne = async (id: string): Promise<Category> => {
    return (await $api.get(`/categories/${id}`)).data;
}

export const searchCategories = async ({
    search,
    page = 1,
    limit = 10,
}: {
    search: string;
    page?: number;
    limit?: number;
}) => {
    const res = await $api.get("/categories/search", {
        params: {
            search,
            page,
            limit,
        },
    });

    return res.data;
};