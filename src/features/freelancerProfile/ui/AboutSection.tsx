import { User, type UserProjectStats } from "@/features/auth/model/types";
import ButtonPill from "@/shared/components/ui/Button/ButtonPill";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatRing } from "./Statring";


interface AboutSectionProps {
    user: User | null | undefined;
    stats?: UserProjectStats | null;
    showRatingPosition?: boolean;
    ratingPosition?: { position: number; total: number };
    onSaveBio?: (bio: string) => void;
    isSaving?: boolean;
}

export const AboutSection = ({ user, stats, showRatingPosition = true, ratingPosition, onSaveBio, isSaving }: AboutSectionProps) => {
    const { t, i18n } = useTranslation("common");

    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState("");

    const startEditing = () => {
        setDraft(user?.bio ?? "");
        setIsEditing(true);
    };

    const save = () => {
        onSaveBio?.(draft.trim());
        setIsEditing(false);
    };

    const hasRating = Number(user?.ratings) > 0;
    const rate = Number(user?.rate) || 0;
    const completed = stats?.completedAsFreelancer ?? 0;
    const taken = stats?.takenAsFreelancer ?? 0;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-25 font-bold text-text dark:text-text-dark">
                    {t("profile.about.title")}
                </h2>
                {onSaveBio && !isEditing && (
                    <button type="button" onClick={startEditing} className="text-sm text-success">
                        {t("profile.edit.editBio")}
                    </button>
                )}
            </div>

            {showRatingPosition && <div className="flex items-center justify-between gap-4 rounded-3xl bg-surface px-6 py-3 dark:bg-bg-modalDark">
                <p className="text-base font-medium leading-[29px] text-text dark:text-text-dark">
                    {t("profile.about.ratingPosition")}
                </p>
                <p className="whitespace-nowrap text-sm text-text-light">
                    {ratingPosition ? (
                        <>
                            <span className="text-text dark:text-text-dark">
                                {ratingPosition.position.toLocaleString(i18n.language)}
                            </span>{" "}
                            /{ratingPosition.total.toLocaleString(i18n.language)}
                        </>
                    ) : (
                        "–"
                    )}
                </p>
            </div>}

            <div className="flex flex-col gap-3 md:flex-row">
                <StatRing
                    label={t("profile.about.successfulProjects")}
                    sublabel={t("profile.about.allTime")}
                    centerText={`${completed}/${taken}`}
                    progress={taken ? completed / taken : 0}
                />
                <StatRing
                    label={t("profile.about.rating")}
                    sublabel={hasRating ? t("profile.about.allTime") : t("profile.noData.rating")}
                    centerText={hasRating ? `${Number(user!.ratings).toFixed(1)} / 5,0` : "–"}
                    progress={hasRating ? Number(user!.ratings) / 5 : 0}
                    color="star"
                />
                <StatRing
                    label={t("profile.about.hourRate")}
                    sublabel={rate ? t("profile.about.perHour") : t("profile.noData.hourRate")}
                    centerText={rate ? `${user?.rateType === "FROM" ? "≥" : ""}${rate}$` : "–"}
                    progress={rate ? 1 : 0}
                    color="secondary"
                />
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-3">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={6}
                        autoFocus
                        aria-label={t("profile.edit.bioLabel")}
                        placeholder={t("profile.edit.bioPlaceholder")}
                        className="w-full resize-y rounded-3xl border border-border-light bg-bg-header p-6 text-base text-text outline-none focus:border-success dark:border-white/10 dark:bg-input-dark dark:text-text-dark"
                    />
                    <div className="flex items-center justify-end gap-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="text-sm text-text-light">
                            {t("profile.edit.cancel")}
                        </button>
                        <ButtonPill onClick={save} disabled={isSaving} text={t("profile.edit.save")} />
                    </div>
                </div>
            ) : (
                <p className="whitespace-pre-line text-base text-text dark:text-text-dark">
                    {user?.bio || t("profile.noData.bio")}
                </p>
            )}
        </section>
    );
};
