import type { Review } from "@/features/freelancerProfile/ui/ReviewCard";
import type { ProjectReview } from "./types";

const formatReviewDate = (iso: string) => {
    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

/** API-відгук → формат картки з профілю (у дизайні "Communication" підписано як "Sociability") */
export const toReviewCard = (review: ProjectReview): Review => ({
    id: review.id,
    title: review.projectTitle,
    date: formatReviewDate(review.createdAt),
    text: review.text,
    authorName: review.author?.name ?? "",
    authorAvatarUrl: review.author?.avatarUrl ?? undefined,
    criteria: {
        quality: review.quality,
        professionalism: review.professionalism,
        price: review.price,
        sociability: review.communication,
        deadlines: review.deadlines,
    },
});
