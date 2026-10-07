import { useTranslation } from "react-i18next";
import { Pagination } from "./Pagination";
import { Review, ReviewCard } from "./ReviewCard";


interface ReviewsSectionProps {
    reviews?: Review[];
    page?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
    ownerName?: string;
    canRespond?: boolean;
    onRespond?: (id: string, text: string) => Promise<unknown>;
}

export const ReviewsSection = ({
    reviews = [],
    page = 1,
    pageCount = 1,
    onPageChange,
    ownerName,
    canRespond,
    onRespond,
}: ReviewsSectionProps) => {
    const { t } = useTranslation("common");

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-25 font-bold text-text dark:text-text-dark">
                {t("profile.reviews.title")}
            </h2>

            {reviews.length === 0 ? (
                <p className="rounded-3xl bg-surface px-6 py-3 text-sm text-text-light dark:bg-bg-modalDark">
                    {t("profile.noData.reviews")}
                </p>
            ) : (
                <>
                    <div className="flex flex-col gap-3">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                ownerName={ownerName}
                                canRespond={canRespond}
                                onRespond={onRespond ? (text) => onRespond(review.id, text) : undefined}
                            />
                        ))}
                    </div>
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                </>
            )}
        </section>
    );
};