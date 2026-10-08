import type { User } from "@/features/auth/model/types";
import type { Project } from "@/features/projects/model/types";
import type { ProjectReview } from "@/features/reviews/model/types";

export interface TopClient extends Pick<User, "id" | "firstName" | "lastName" | "avatarUrl" | "ratings" | "rates" | "position" | "bio"> {
    isVerified: boolean;
    lastReview: ProjectReview | null;
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
    ratingCounts: Record<RatingStars, number>;
}
