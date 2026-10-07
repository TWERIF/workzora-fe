import HandshakeIcon from "@/shared/components/svg/HandshakeIcon";
import { Clock } from "@/shared/components/svg/Knowledgebase/Clock";
import MoneyIcon from "@/shared/components/svg/Knowledgebase/MoneyIcon";
import SolarCaseOutline from "@/shared/components/svg/Knowledgebase/SolarCaseOutline";
import VerifiedIcon from "@/shared/components/svg/VerifiedIcon";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import type { AxiosError } from "axios";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { REVIEW_CRITERIA, ReviewCriterion, ReviewScores } from "../model/types";
import { useCreateReview } from "../model/useReviews";
import { ReviewCriterionRow } from "./ReviewCriterionRow";
import { ReviewTextarea } from "./ReviewTextarea";

const CRITERIA_ICONS: Record<ReviewCriterion, ReactNode> = {
    quality: <VerifiedIcon w={28} h={28} />,
    professionalism: <SolarCaseOutline width={28} height={28} className="text-success" />,
    communication: <HandshakeIcon />,
    price: <MoneyIcon size={28} color="#7EA310" />,
    deadlines: <Clock className="size-7" />,
};

const EMPTY_SCORES: ReviewScores = { quality: 0, professionalism: 0, communication: 0, price: 0, deadlines: 0 };

interface ReviewFormProps {
    projectId: string;
    reviewing: "freelancer" | "client";
    onCancel: () => void;
    onSuccess: () => void;
}

export const ReviewForm = ({ projectId, reviewing, onCancel, onSuccess }: ReviewFormProps) => {
    const { t } = useTranslation("review");
    const createReview = useCreateReview();

    const [scores, setScores] = useState<ReviewScores>(EMPTY_SCORES);
    const [text, setText] = useState("");
    const [privateFeedback, setPrivateFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const missingScores = REVIEW_CRITERIA.filter((key) => scores[key] === 0);
    const textError = submitted && !text.trim() ? t("errors.textRequired") : undefined;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (missingScores.length || !text.trim()) return;

        createReview.mutate(
            { projectId, ...scores, text: text.trim(), privateFeedback: privateFeedback.trim() || undefined },
            { onSuccess },
        );
    };

    const serverError = (createReview.error as AxiosError<{ message?: string }> | null)?.response?.data?.message;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <section className="flex flex-col gap-6 rounded-3xl bg-surface p-4 dark:bg-bg-modalDark sm:p-6">
                <h2 className="text-xl font-semibold leading-[29px] text-text dark:text-text-dark">
                    {t("rate.title")}
                </h2>

                <div className="flex flex-col gap-3">
                    {REVIEW_CRITERIA.map((key) => (
                        <ReviewCriterionRow
                            key={key}
                            icon={CRITERIA_ICONS[key]}
                            title={t(`criteria.${key}.title`)}
                            description={t(`criteria.${key}.description.${reviewing}`)}
                            value={scores[key]}
                            onChange={(value) => setScores((prev) => ({ ...prev, [key]: value }))}
                            hasError={submitted && scores[key] === 0}
                        />
                    ))}
                </div>

                {submitted && missingScores.length > 0 && (
                    <p className="text-sm text-status-danger">{t("errors.ratingRequired")}</p>
                )}
            </section>

            <section className="flex flex-col gap-6 rounded-3xl bg-surface p-4 dark:bg-bg-modalDark sm:p-6">
                <h2 className="text-25 font-bold text-text dark:text-text-dark">{t("text.title")}</h2>

                <ReviewTextarea
                    id="review-text"
                    label={t("text.label")}
                    placeholder={t(`text.placeholder.${reviewing}`)}
                    hint={t(`text.hint.${reviewing}`)}
                    value={text}
                    onChange={setText}
                    error={textError}
                />

                <ReviewTextarea
                    id="review-private"
                    label={t("private.label")}
                    placeholder={t("private.placeholder")}
                    hint={t("private.hint")}
                    value={privateFeedback}
                    onChange={setPrivateFeedback}
                />
            </section>

            {createReview.isError && (
                <p className="text-sm text-status-danger">{serverError ?? t("errors.failed")}</p>
            )}

            <div className="flex items-center justify-between gap-4">
                <ButtonGradient
                    text={t("actions.cancel")}
                    onClick={onCancel}
                    filled={false}
                    className="!rounded-[100px] !px-6 !py-3"
                />
                <ButtonGradient
                    type="submit"
                    text={createReview.isPending ? t("actions.submitting") : t("actions.submit")}
                    disabled={createReview.isPending}
                    className="!rounded-[100px] !px-6 !py-3 disabled:opacity-60"
                />
            </div>
        </form>
    );
};
