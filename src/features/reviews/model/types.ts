export const REVIEW_CRITERIA = ["quality", "professionalism", "communication", "price", "deadlines"] as const;
export type ReviewCriterion = (typeof REVIEW_CRITERIA)[number];

export type ReviewScores = Record<ReviewCriterion, number>;

/** Відгук, як його повертає GET /reviews/user/:userId */
export interface ProjectReview extends ReviewScores {
    id: string;
    projectId: string;
    projectTitle: string;
    authorId: string;
    targetId: string;
    authorRole: "client" | "freelancer";
    /** середнє з п'яти критеріїв */
    rating: number;
    text: string;
    createdAt: string;
    author?: {
        id: string;
        name: string;
        avatarUrl: string | null;
    } | null;
}

export interface CreateReviewDto extends ReviewScores {
    projectId: string;
    text: string;
    privateFeedback?: string;
}

export interface PaginatedReviews {
    data: ProjectReview[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const MAX_REVIEW_LENGTH = 1000;
