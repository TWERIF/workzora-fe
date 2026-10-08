import CloseRoundedIcon from "@/shared/components/svg/CloseRoundedIcon";
import { useTranslation } from "react-i18next";
import type { RatingStars } from "../model/types";

const STAR_OPTIONS: RatingStars[] = [5, 4, 3, 2, 1];

interface ClientFiltersProps {
    selected: RatingStars[];
    counts?: Record<RatingStars, number>;
    onToggle: (stars: RatingStars) => void;
    onClear: () => void;
}

export const ClientFilters = ({ selected, counts, onToggle, onClear }: ClientFiltersProps) => {
    const { t } = useTranslation("topClients");

    return (
        <div className="flex flex-col gap-4 rounded-22 border border-border-light p-6 dark:border-white/10">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold leading-[15px] text-text dark:text-text-dark">{t("filters.title")}</p>
                <button
                    type="button"
                    onClick={onClear}
                    className="border-b border-dashed border-danger py-px text-xs text-danger"
                >
                    {t("filters.clearAll")}
                </button>
            </div>

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-[6px]">
                    {selected.map((stars) => (
                        <button
                            key={stars}
                            type="button"
                            onClick={() => onToggle(stars)}
                            aria-label={t("filters.remove", { stars })}
                            className="flex items-center justify-center gap-2 rounded-full border border-border-light bg-bg-header px-4 py-2 text-xs text-text dark:border-white/10 dark:bg-input-dark dark:text-text-dark"
                        >
                            {t("filters.starsChip", { stars })}
                            <CloseRoundedIcon className="size-4 text-danger" />
                        </button>
                    ))}
                </div>
            )}

            <fieldset className="flex flex-col gap-3">
                <legend className="mb-3 text-base font-semibold leading-[29px] text-text dark:text-text-dark">
                    {t("filters.rating")}
                </legend>
                <div className="flex flex-col gap-2">
                    {STAR_OPTIONS.map((stars) => {
                        const isChecked = selected.includes(stars);
                        return (
                            <label key={stars} className="flex cursor-pointer items-center gap-[10px] rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => onToggle(stars)}
                                    className="peer sr-only"
                                />
                                <span
                                    aria-hidden="true"
                                    className={`size-[14px] shrink-0 rounded-full bg-bg-header peer-focus-visible:ring-2 peer-focus-visible:ring-success/40 ${isChecked ? "border-4 border-success" : "border border-border-light dark:border-white/20"
                                        }`}
                                />
                                <span className="flex-1 text-sm text-text dark:text-text-dark">{stars}</span>
                                <span className="text-xs text-success">({counts?.[stars] ?? 0})</span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
};
