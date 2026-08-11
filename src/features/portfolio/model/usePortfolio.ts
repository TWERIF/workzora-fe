import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createPortfolio,
    deletePortfolio,
    getAllPortfolios,
    getMyPortfolios,
    getPortfolioByUserId,
    updatePortfolio,
} from "./api";

export const portfolioKeys = {
  all: (page: number, limit: number) => ["portfolios", page, limit],
  byUserId: (userId: string) => ["portfolios-user", userId],
  myList: ["portfolios-my"] as const,
  lists: ["portfolios"] as const,
};


export const usePortfolioList = (
    page: number = 1,
    limit: number = 10,
) => {
    return useQuery({
        queryFn: () => getAllPortfolios(page, limit),
        queryKey: portfolioKeys.all(page, limit),
    });
};

export const usePortfolioByUserId = (userId?: string) => {
    return useQuery({
        queryFn: () => getPortfolioByUserId(userId!),
        queryKey: portfolioKeys.byUserId(userId!),
        enabled: !!userId,
    });
};

export const useMyPortfolios = () => {
  return useQuery({
    queryFn: getMyPortfolios,
    queryKey: portfolioKeys.myList, 
  });
};

export const useCreatePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPortfolio,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.lists });
            queryClient.invalidateQueries({ queryKey: portfolioKeys.myList });
        },
    });
};

export const useUpdatePortfolio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePortfolio,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: portfolioKeys.lists });
            queryClient.invalidateQueries({ queryKey: portfolioKeys.myList });

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
            queryClient.invalidateQueries({ queryKey: portfolioKeys.myList });
        },
    });
};