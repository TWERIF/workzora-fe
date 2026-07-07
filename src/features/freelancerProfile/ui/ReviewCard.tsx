import { useTranslation } from "react-i18next";
import { RatingStars } from "./RatingStars";


export interface ReviewCriteria {
    quality: number;
    professionalism: number;
    price: number;
    sociability: number;
    deadlines: number;
}

export interface Review {
    id: string;
    title: string;
    date: string;
    text: string;
    authorName: string;
    authorAvatarUrl?: string;
    criteria: ReviewCriteria;
}

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const { t } = useTranslation("common");

    const criteriaEntries: (keyof ReviewCriteria)[] = [
        "quality",
        "professionalism",
        "price",
        "sociability",
        "deadlines",
    ];

    return (
        <article className="rounded-20 border border-border bg-bg-header px-15 py-13 dark:bg-bg-modalDark">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-text dark:text-text-dark">{review.title}</h3>
                        <span className="text-xs text-text-muted">{review.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">{review.text}</p>

                    <div className="mt-3 flex items-center gap-2">
                        <div className="h-7 w-7 overflow-hidden rounded-full bg-gradient">
                            {review.authorAvatarUrl && (
                                <img
                                    src={review.authorAvatarUrl}
                                    alt={review.authorName}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <span className="text-xs text-text dark:text-text-dark">{review.authorName}</span>
                        <button type="button" className="text-xs text-success">
                            {t("profile.reviews.responseToReview")}
                        </button>
                    </div>
                </div>

                <div className="shrink-0 space-y-1">
                    {criteriaEntries.map((key) => (
                        <div key={key} className="flex items-center justify-between gap-3 text-xs">
                            <span className="text-text-muted">{t(`profile.reviews.criteria.${key}`)}</span>
                            <RatingStars value={review.criteria[key]} size={11} />
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
};