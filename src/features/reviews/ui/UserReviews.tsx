import { ReviewsSection } from "@/features/freelancerProfile/ui/ReviewsSection";
import { useState } from "react";
import { toReviewCard } from "../model/mapReview";
import { useUserReviews } from "../model/useReviews";

const REVIEWS_PER_PAGE = 5;

export const UserReviews = ({ userId }: { userId?: string }) => {
    const [page, setPage] = useState(1);
    const { data } = useUserReviews(userId, page, REVIEWS_PER_PAGE);

    return (
        <ReviewsSection
            reviews={data?.data.map(toReviewCard) ?? []}
            page={page}
            pageCount={Math.max(1, data?.totalPages ?? 1)}
            onPageChange={setPage}
        />
    );
};
