import { MAX_REVIEW_LENGTH } from "../model/types";

interface ReviewTextareaProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const ReviewTextarea = ({ id, label, placeholder, hint, value, onChange, error }: ReviewTextareaProps) => (
    <div className="flex flex-col gap-[6px]">
        <label htmlFor={id} className="text-sm leading-[26px] text-text dark:text-text-dark">
            {label}
        </label>
        <div
            className={`relative rounded-20 border ${error ? "border-status-danger" : "border-border-light dark:border-white/10"
                }`}
        >
            <textarea
                id={id}
                value={value}
                maxLength={MAX_REVIEW_LENGTH}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="block h-[131px] w-full resize-none rounded-20 bg-transparent px-15 pb-8 pt-3 text-sm leading-[26px] text-text outline-none placeholder:text-text-light dark:text-text-dark dark:placeholder:text-text-muted"
            />
            <span className="pointer-events-none absolute bottom-3 right-4 text-sm leading-[26px] text-text-light dark:text-text-muted">
                {value.length}/{MAX_REVIEW_LENGTH}
            </span>
        </div>
        {error ? (
            <p className="text-xs leading-[21px] text-status-danger">{error}</p>
        ) : (
            <p className="text-xs leading-[21px] text-text-light dark:text-text-muted">{hint}</p>
        )}
    </div>
);
