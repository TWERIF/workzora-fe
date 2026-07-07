import { useState } from "react";
import { useTranslation } from "react-i18next";

// NOTE: `Post` currently has no `category` field (see types.ts), so these
// tabs are presentational only — they highlight a selection but don't
// filter `usePostList`'s results yet. Wire `onChange` up to your query
// once the API exposes a category to filter by.

const CATEGORY_KEYS = [
    "blog.categories.all",
    "blog.categories.freelance",
    "blog.categories.marketing",
    "blog.categories.ai",
    "blog.categories.telegram",
    "blog.categories.caseStudies",
] as const;

interface CategoryTabsProps {
    onChange?: (categoryKey: string) => void;
}

export const CategoryTabs = ({ onChange }: CategoryTabsProps) => {
    const { t } = useTranslation("common");
    const [active, setActive] = useState<string>(CATEGORY_KEYS[0]);

    const handleSelect = (key: string) => {
        setActive(key);
        onChange?.(key);
    };

    return (
        <div className="flex flex-wrap gap-3">
            {CATEGORY_KEYS.map((key) => {
                const isActive = key === active;

                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => handleSelect(key)}
                        className={[
                            "rounded-20 px-15 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-gradient text-white"
                                : "border border-border bg-transparent text-text hover:border-success/60 hover:text-success dark:text-text-dark",
                        ].join(" ")}
                    >
                        {t(key)}
                    </button>
                );
            })}
        </div>
    );
};
