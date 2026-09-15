import { useTranslation } from "react-i18next";
import { HISTORY_PERIODS } from "../model/constants";
import { HistoryPeriod } from "../model/types";


interface PeriodSelectProps {
    value: HistoryPeriod;
    onChange: (period: HistoryPeriod) => void;
}

export const PeriodSelect = ({ value, onChange }: PeriodSelectProps) => {
    const { t } = useTranslation("finances");

    return (
        <label className="flex items-center gap-2 rounded-20 border border-border bg-white px-4 py-2 dark:border-white/10 dark:bg-input-dark">
            <span className="sr-only">{t("history.periods.label")}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect
                    x="2.5"
                    y="4"
                    width="15"
                    height="13.5"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    className="text-text-light"
                />
                <path
                    d="M2.5 8h15M6.5 2.5V5M13.5 2.5V5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    className="text-text-light"
                />
            </svg>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as HistoryPeriod)}
                className="bg-transparent pr-1 text-sm text-text outline-none dark:text-text-dark"
            >
                {HISTORY_PERIODS.map((period) => (
                    <option key={period} value={period}>
                        {t(`history.periods.${period}`)}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default PeriodSelect;
