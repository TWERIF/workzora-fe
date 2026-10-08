import { RatingStars } from "@/features/freelancerProfile/ui/RatingStars";
import { toReviewCard } from "@/features/reviews/model/mapReview";
import type { ProjectReview } from "@/features/reviews/model/types";
import { useTranslation } from "react-i18next";

const CRITERIA = ["quality", "professionalism", "price", "sociability", "deadlines"] as const;

export const LastReviewBlock = ({ review }: { review: ProjectReview }) => {
    const { t } = useTranslation("topClients");
    const { t: tCommon } = useTranslation("common");
    const card = toReviewCard(review);
    const criteria = CRITERIA.filter((key) => card.criteria[key] > 0);

    return (
        <div className="flex flex-col gap-3">
            <p className="text-xl font-bold text-text dark:text-text-dark">{t("card.lastReview")}</p>

            <div className="flex min-w-0 flex-col gap-3 rounded-[24px] bg-bg-header p-4 dark:bg-input-dark sm:rounded-36 sm:p-9">
                <div className="flex flex-col gap-3 text-text dark:text-text-dark">
                    <div className="flex flex-col-reverse items-start justify-between gap-1 sm:flex-row sm:gap-4">
                        <p className="min-w-0 break-words text-lg font-semibold leading-[26px] sm:text-xl sm:leading-[29px]">{card.title}</p>
                        <p className="shrink-0 text-right text-xs font-medium opacity-50">{card.date}</p>
                    </div>
                    <p className="break-words text-sm sm:text-base">{card.text}</p>
                </div>

                <div className="grid grid-cols-1 gap-[6px] sm:grid-cols-2">
                    {criteria.map((key, i) => (
                        <div
                            key={key}
                            className={`flex min-w-0 items-center justify-between gap-2 rounded-xl bg-surface px-3 py-3 dark:bg-bg-modalDark sm:gap-3 sm:px-6 ${i === criteria.length - 1 && criteria.length % 2 === 1 ? "sm:col-span-2" : ""
                                }`}
                        >
                            <span className="min-w-0 truncate text-sm text-text dark:text-text-dark">
                                {tCommon(`profile.reviews.criteria.${key}`)}
                            </span>
                            <span className="shrink-0">
                                <RatingStars value={card.criteria[key]} size={15} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
