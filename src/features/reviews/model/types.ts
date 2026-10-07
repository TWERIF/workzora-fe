export const REVIEW_CRITERIA = ["quality", "professionalism", "communication", "price", "deadlines"] as const;
export type ReviewCriterion = (typeof REVIEW_CRITERIA)[number];

export const CLIENT_REVIEW_CRITERIA = ["communication", "quality", "price", "professionalism"] as const satisfies readonly ReviewCriterion[];

export const CLIENT_CRITERION_LABELS: Record<(typeof CLIENT_REVIEW_CRITERIA)[number], string> = {
    communication: "sociability",
    quality: "requirements",
    price: "payment",
    professionalism: "professionalism",
};

export type ReviewScores = Record<ReviewCriterion, number>;

export interface ProjectReview extends ReviewScores {
    id: string;
    projectId: string;
    projectTitle: string;
    authorId: string;
    targetId: string;
    authorRole: "client" | "freelancer";
    rating: number;
    text: string;
    response?: string | null;
    respondedAt?: string | null;
    createdAt: string;
    author?: {
        id: string;
        name: string;
        avatarUrl: string | null;
    } | null;
}

export interface CreateReviewDto extends Omit<ReviewScores, "deadlines"> {
    deadlines?: number;
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
