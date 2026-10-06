import type { User } from "@/features/auth/model/types";
import type { Project } from "@/features/projects/model/types";
import type { ProjectReview } from "@/features/reviews/model/types";

export interface TopClient extends Pick<User, "id" | "firstName" | "lastName" | "avatarUrl" | "ratings" | "rates" | "position" | "bio"> {
    /** KYC пройдено */
    isVerified: boolean;
    /** останній відгук фрилансера про клієнта */
    lastReview: ProjectReview | null;
    /** останній проєкт — лише якщо відгуків ще немає */
    lastProject: (Omit<Project, "client" | "clientName"> & { proposalsCount?: number }) | null;
}

export type RatingStars = 1 | 2 | 3 | 4 | 5;

export interface TopClientsParams {
    page: number;
    limit: number;
    search?: string;
    ratings?: RatingStars[];
}

export interface TopClientsResponse {
    data: TopClient[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    /** кількість клієнтів з округленим рейтингом 1..5 */
    ratingCounts: Record<RatingStars, number>;
}
