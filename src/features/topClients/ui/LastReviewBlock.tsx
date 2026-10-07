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

            <div className="flex flex-col gap-3 rounded-36 bg-bg-header p-6 dark:bg-input-dark sm:p-9">
                <div className="flex flex-col gap-3 text-text dark:text-text-dark">
                    <div className="flex items-start justify-between gap-4">
                        <p className="text-xl font-semibold leading-[29px]">{card.title}</p>
                        <p className="shrink-0 text-right text-xs font-medium opacity-50">{card.date}</p>
                    </div>
                    <p className="text-base">{card.text}</p>
                </div>

                <div className="grid grid-cols-1 gap-[6px] sm:grid-cols-2">
                    {criteria.map((key, i) => (
                        <div
                            key={key}
                            className={`flex items-center justify-between gap-3 rounded-xl bg-surface px-6 py-3 dark:bg-bg-modalDark ${i === criteria.length - 1 && criteria.length % 2 === 1 ? "sm:col-span-2" : ""
                                }`}
                        >
                            <span className="text-sm text-text dark:text-text-dark">
                                {tCommon(`profile.reviews.criteria.${key}`)}
                            </span>
                            <RatingStars value={card.criteria[key]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
