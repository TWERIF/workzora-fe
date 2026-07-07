import { useTranslation } from "react-i18next";
import { Pagination } from "./Pagination";
import { Review, ReviewCard } from "./Reviewcard";


interface ReviewsSectionProps {
    reviews?: Review[];
    page?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
}

export const ReviewsSection = ({
    reviews = [],
    page = 1,
    pageCount = 1,
    onPageChange,
}: ReviewsSectionProps) => {
    const { t } = useTranslation("common");

    return (
        <section>
            <h2 className="text-base font-semibold text-text dark:text-text-dark">
                {t("profile.reviews.title")}
            </h2>

            {reviews.length === 0 ? (
                <p className="mt-3 rounded-20 border border-border bg-bg-header px-15 py-13 text-sm text-text-muted dark:bg-bg-modalDark">
                    {t("profile.noData.reviews")}
                </p>
            ) : (
                <>
                    <div className="mt-3 space-y-3">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                </>
            )}
        </section>
    );
};