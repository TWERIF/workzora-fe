import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createPortfolio,
    deletePortfolio,
    getAllPortfolios,
    getPortfoliosByUserId,
    updatePortfolio,
} from "./api";

// Ключі для кешування
export const portfolioKeys = {
    all: (page: number, limit: number) => [
        "portfolios",
        page,
        limit,
    ],

    byUserId: (userId: string) => [
        "portfolios-user",
        userId,
    ],

    // Базовий ключ для інвалідації всіх списків портфоліо
    lists: ["portfolios"] as const,
};

// --- Хуки для отримання даних (Queries) ---

export const usePortfolioList = (
    page: number = 1,
    limit: number = 10,
) => {
    return useQuery({
        queryFn: () => getAllPortfolios(page, limit),
        queryKey: portfolioKeys.all(page, limit),
    });
};

export const useUserPortfolios = (userId?: string) => {
    return useQuery({
        queryFn: () => getPortfoliosByUserId(userId!),
        queryKey: portfolioKeys.byUserId(userId!),
        enabled: !!userId,
    });
};

// --- Хуки для зміни даних (Mutations) ---

export const useCreatePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPortfolio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.lists });
        },
    });
};

export const useUpdatePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePortfolio,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.lists });

            const userId = variables.get("userId");

            if (userId && typeof userId === "string") {
                queryClient.invalidateQueries({ queryKey: portfolioKeys.byUserId(userId) });
            }
        },
    });
};

export const useDeletePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePortfolio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.lists });
        },
    });
};