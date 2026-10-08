import type { ReactNode } from "react";
import { StarRatingInput } from "./StarRatingInput";

interface ReviewCriterionRowProps {
    icon: ReactNode;
    title: string;
    description: string;
    value: number;
    onChange: (value: number) => void;
    hasError?: boolean;
}

export const ReviewCriterionRow = ({ icon, title, description, value, onChange, hasError }: ReviewCriterionRowProps) => (
    <div
        className={`flex flex-col gap-4 rounded-3xl border bg-bg-header py-3 pl-3 pr-6 dark:bg-input-dark md:flex-row md:items-center md:justify-between ${hasError ? "border-status-danger" : "border-transparent"
            }`}
    >
        <div className="flex items-center gap-4">
            <div className="flex size-[55px] shrink-0 items-center justify-center rounded-2xl border border-success/10 bg-success/5 p-[10px]">
                {icon}
            </div>
            <div className="flex flex-col">
                <p className="text-base font-medium leading-[29px] text-text dark:text-text-dark">{title}</p>
                <p className="text-sm text-text-light dark:text-text-muted">{description}</p>
            </div>
        </div>

        <div className="flex items-center gap-6 pl-3 md:gap-9 md:pl-0">
            <StarRatingInput value={value} onChange={onChange} label={title} />
            <p className="w-8 shrink-0 text-base font-medium text-text dark:text-text-dark">{value}/5</p>
        </div>
    </div>
);
