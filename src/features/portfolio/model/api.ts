import { $api } from "@/shared/components/http";
import type { PortfolioItem } from "./types";

export const getAllPortfolios = async (
    page: number = 1,
    limit: number = 10,
) => {
    const res = await $api.get("/portfolio", {
        params: {
            page,
            limit,
        },
    });

    return res.data;
};

export const getPortfolioByUserId = async (userId: string): Promise<PortfolioItem[]> => {
    const res = await $api.get<PortfolioItem[]>(`/portfolio/${userId}`);
    return res.data;
};
export const getMyPortfolios = async (): Promise<PortfolioItem[]> => {
    const res = await $api.get<PortfolioItem[]>(`/portfolio/me`);
    return res.data;
};

export const createPortfolio = async (data: FormData) => {
    const res = await $api.post("/portfolio", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;
};

export const updatePortfolio = async ({ id, data }: { id: string; data: FormData }) => {
    const res = await $api.patch(`/portfolio/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;
};

export const deletePortfolio = async (id: string) => {
    const res = await $api.delete(`/portfolio/${id}`);
    return res.data;
};
export const addPortfolioView = async (id: string) => {
    const res = await $api.post<{ success: boolean }>(`/portfolio/${id}/view`);
    return res.data;
};
