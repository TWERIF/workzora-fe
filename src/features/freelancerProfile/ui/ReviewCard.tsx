import { useState } from "react";
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
    aboutClient?: boolean;
    response?: string | null;
}

interface ReviewCardProps {
    review: Review;
    ownerName?: string;
    canRespond?: boolean;
    onRespond?: (text: string) => Promise<unknown>;
}

const FREELANCER_CRITERIA: { key: keyof ReviewCriteria; label: string }[] = [
    { key: "quality", label: "quality" },
    { key: "professionalism", label: "professionalism" },
    { key: "price", label: "price" },
    { key: "sociability", label: "sociability" },
    { key: "deadlines", label: "deadlines" },
];

const CLIENT_CRITERIA: { key: keyof ReviewCriteria; label: string }[] = [
    { key: "sociability", label: "sociability" },
    { key: "quality", label: "requirements" },
    { key: "price", label: "payment" },
    { key: "professionalism", label: "professionalism" },
];

export const ReviewCard = ({ review, ownerName, canRespond, onRespond }: ReviewCardProps) => {
    const { t } = useTranslation("common");
    const [isWriting, setIsWriting] = useState(false);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const criteria = review.aboutClient ? CLIENT_CRITERIA : FREELANCER_CRITERIA;

    const send = async () => {
        if (!onRespond || !draft.trim()) return;
        setIsSending(true);
        try {
            await onRespond(draft.trim());
            setIsWriting(false);
            setDraft("");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <article className="flex flex-col gap-6 rounded-36 bg-surface p-6 dark:bg-bg-modalDark sm:p-9 md:flex-row md:gap-9">
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col gap-3 text-text dark:text-text-dark">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="min-w-0 break-words text-xl font-semibold leading-[29px]">{review.title}</h3>
                        <span className="shrink-0 text-xs font-medium opacity-50">{review.date}</span>
                    </div>
                    <p className="whitespace-pre-line break-words text-base">{review.text}</p>
                </div>

                {review.response && (
                    <div className="rounded-20 border-l-4 border-primary bg-background p-4 text-sm dark:bg-input-dark">
                        <p className="font-medium text-primary">
                            {ownerName ? t("profile.reviews.authorResponse", { name: ownerName }) : t("profile.reviews.yourResponse")}
                        </p>
                        <p className="mt-1 whitespace-pre-line break-words">{review.response}</p>
                    </div>
                )}

                {isWriting && (
                    <div className="flex flex-col gap-3">
                        <textarea
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            rows={3}
                            maxLength={2000}
                            autoFocus
                            aria-label={t("profile.reviews.yourResponse")}
                            placeholder={t("profile.reviews.responsePlaceholder")}
                            className="w-full resize-y rounded-20 border border-main-10 bg-background p-4 text-sm outline-none focus:border-primary dark:bg-input-dark"
                        />
                        <div className="flex items-center justify-end gap-4">
                            <button type="button" onClick={() => setIsWriting(false)} className="text-sm text-main-50">
                                {t("profile.reviews.cancel")}
                            </button>
                            <button
                                type="button"
                                onClick={send}
                                disabled={isSending || !draft.trim()}
                                className="h-[40px] rounded-full bg-gradient px-5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                            >
                                {t("profile.reviews.send")}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="size-[38px] shrink-0 overflow-hidden rounded-full bg-gradient">
                            {review.authorAvatarUrl && (
                                <img src={review.authorAvatarUrl} alt={review.authorName} className="h-full w-full object-cover" />
                            )}
                        </div>
                        <span className="truncate text-sm text-text dark:text-text-dark">{review.authorName}</span>
                    </div>
                    {canRespond && !review.response && !isWriting && (
                        <button type="button" onClick={() => setIsWriting(true)} className="shrink-0 text-sm text-success hover:underline">
                            {t("profile.reviews.responseToReview")}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-[6px] md:w-[259px]">
                {criteria.map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between gap-3 rounded-xl bg-bg-header px-6 py-3 dark:bg-input-dark">
                        <span className="text-sm text-text dark:text-text-dark">{t(`profile.reviews.criteria.${label}`)}</span>
                        <RatingStars value={review.criteria[key]} />
                    </div>
                ))}
            </div>
        </article>
    );
};
