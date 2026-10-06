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
        <article className="flex flex-col gap-9 rounded-36 bg-surface p-6 dark:bg-bg-modalDark sm:p-9 md:flex-row">
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col gap-3 text-text dark:text-text-dark">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold leading-[29px]">{review.title}</h3>
                        <span className="shrink-0 text-xs font-medium opacity-50">{review.date}</span>
                    </div>
                    <p className="text-base">{review.text}</p>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-[38px] shrink-0 overflow-hidden rounded-full bg-gradient">
                            {review.authorAvatarUrl && (
                                <img
                                    src={review.authorAvatarUrl}
                                    alt={review.authorName}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <span className="text-sm text-text dark:text-text-dark">{review.authorName}</span>
                    </div>
                    <button type="button" className="text-sm text-success">
                        {t("profile.reviews.responseToReview")}
                    </button>
                </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-[6px] md:w-[259px]">
                {criteriaEntries.map((key) => (
                    <div
                        key={key}
                        className="flex items-center justify-between gap-3 rounded-xl bg-bg-header px-6 py-3 dark:bg-input-dark"
                    >
                        <span className="text-sm text-text dark:text-text-dark">{t(`profile.reviews.criteria.${key}`)}</span>
                        <RatingStars value={review.criteria[key]} />
                    </div>
                ))}
            </div>
        </article>
    );
};
