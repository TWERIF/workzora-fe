import { useAuth } from "@/features/auth/model/useAuth";
import { ReviewsSection } from "@/features/freelancerProfile/ui/ReviewsSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { toReviewCard } from "../model/mapReview";
import { useRespondToReview, useUserReviews } from "../model/useReviews";

const REVIEWS_PER_PAGE = 5;

export const UserReviews = ({ userId, ownerName }: { userId?: string; ownerName?: string }) => {
    const { t } = useTranslation("common");
    const [page, setPage] = useState(1);
    const { data } = useUserReviews(userId, page, REVIEWS_PER_PAGE);
    const { user } = useAuth();
    const respond = useRespondToReview();
    const isOwner = Boolean(user && userId && user.id === userId);

    const onRespond = (id: string, text: string) =>
        respond.mutateAsync(
            { id, text },
            {
                onSuccess: () => toast.success(t("profile.reviews.sent")),
                onError: () => toast.error(t("profile.reviews.error")),
            },
        );

    return (
        <ReviewsSection
            reviews={data?.data.map(toReviewCard) ?? []}
            page={page}
            pageCount={Math.max(1, data?.totalPages ?? 1)}
            onPageChange={setPage}
            ownerName={isOwner ? undefined : ownerName}
            canRespond={isOwner}
            onRespond={isOwner ? onRespond : undefined}
        />
    );
};
