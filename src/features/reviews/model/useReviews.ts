import { authKeys } from "@/features/auth/model/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getMyProjectReview, getUserReviews } from "./api";
import type { CreateReviewDto } from "./types";

export const reviewKeys = {
    all: ["reviews"] as const,
    user: (userId: string, page: number, limit: number) => ["reviews", "user", userId, page, limit] as const,
    mine: (projectId: string) => ["reviews", "mine", projectId] as const,
};

export const useUserReviews = (userId: string | undefined, page = 1, limit = 5) =>
    useQuery({
        queryKey: reviewKeys.user(userId ?? "", page, limit),
        queryFn: () => getUserReviews(userId!, page, limit),
        enabled: Boolean(userId),
        placeholderData: (previousData) => previousData,
    });

export const useMyProjectReview = (projectId: string | undefined, enabled = true) =>
    useQuery({
        queryKey: reviewKeys.mine(projectId ?? ""),
        queryFn: () => getMyProjectReview(projectId!),
        enabled: Boolean(projectId) && enabled,
    });

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewDto) => createReview(data),
        onSuccess: (review) => {
            queryClient.invalidateQueries({ queryKey: reviewKeys.all });
            queryClient.invalidateQueries({ queryKey: authKeys.findUser(review.targetId) });
        },
    });
};
