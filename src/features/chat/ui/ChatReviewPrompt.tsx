import { useMyProjectReview } from "@/features/reviews/model/useReviews";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const ChatReviewPrompt = ({ projectId }: { projectId: string }) => {
    const { t } = useTranslation("chat");
    const router = useRouter();
    const locale = router.locale || "en";
    const { data: myReview, isLoading } = useMyProjectReview(projectId);

    if (isLoading) return null;

    return (
        <div className="flex flex-col items-start justify-between gap-4 bg-bg p-6 dark:bg-bg-dark sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
                <span className="font-semibold">{t("review.title")}</span>
                <span className="text-sm opacity-70">{myReview ? t("review.done") : t("review.hint")}</span>
            </div>
            {!myReview && (
                <ButtonGradient
                    text={t("review.leave")}
                    onClick={() => router.push(`/${locale}/review/${projectId}`)}
                />
            )}
        </div>
    );
};
