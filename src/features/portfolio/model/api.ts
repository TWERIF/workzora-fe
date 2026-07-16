import { User } from "@/features/auth/model/types";
import { $api } from "@/shared/components/http";

// Основний інтерфейс (як ви вказали)
export interface PortfolioItem {
    id: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    user?: User;
}

// DTO для створення
export interface CreatePortfolioDto {
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
}

// DTO для оновлення
export interface UpdatePortfolioDto extends Partial<CreatePortfolioDto> {
    id: string;
}

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

export const getPortfoliosByUserId = async (userId: string) => {
    if (!userId) return [];

    const res = await $api.get(`/portfolio/me`);

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

export const updatePortfolio = async (data: FormData) => {
    const id = data.get("id");

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