import { $api } from "@/shared/components/http";
import type { CreateReviewDto, PaginatedReviews, ProjectReview } from "./types";

export const createReview = async (data: CreateReviewDto): Promise<ProjectReview> => {
    return (await $api.post("/reviews", data)).data;
};

export const getUserReviews = async (userId: string, page: number, limit: number): Promise<PaginatedReviews> => {
    return (await $api.get(`/reviews/user/${userId}`, { params: { page, limit } })).data;
};

export const getMyProjectReview = async (projectId: string): Promise<ProjectReview | null> => {
    return (await $api.get(`/reviews/project/${projectId}/mine`)).data.review;
};
