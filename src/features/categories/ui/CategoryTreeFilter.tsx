import type { CategoryNode } from "@/features/categories/model/types";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

const VISIBLE_SPECIALIZATIONS = 5;

export interface CategorySelection {
    category: string | null;
    specializations: string[];
}

interface CategoryTreeFilterProps extends CategorySelection {
    tree: CategoryNode[];
    onChange: (next: CategorySelection) => void;
}

export const FilterGroup = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="mt-5">
        <h3 className="mb-2.5 text-sm font-semibold">{title}</h3>
        {children}
    </div>
);

export const selectionChips = (tree: CategoryNode[], { category, specializations }: CategorySelection) => {
    const node = tree.find((item) => item.id === category);
    if (!node) return [];
    return [
        { id: node.id, label: node.title, next: { category: null, specializations: [] } },
        ...specializations.map((id) => ({
            id,
            label: node.specializations.find((item) => item.id === id)?.title ?? "",
            next: { category, specializations: specializations.filter((item) => item !== id) },
        })),
    ];
};

export default function CategoryTreeFilter({ tree, category, specializations, onChange }: CategoryTreeFilterProps) {
    const { t } = useTranslation("common");
    const [showAll, setShowAll] = useState(false);

    const options = tree.find((node) => node.id === category)?.specializations ?? [];
    const visible = showAll ? options : options.slice(0, VISIBLE_SPECIALIZATIONS);

    const toggle = (id: string) =>
        onChange({ category, specializations: specializations.includes(id) ? specializations.filter((item) => item !== id) : [...specializations, id] });

    return (
        <>
            <FilterGroup title={t("categoryFilter.category")}>
                <div role="radiogroup" className="flex flex-col gap-2">
                    {tree.map((node) => {
                        const checked = node.id === category;
                        return (
                            <label key={node.id} className="group flex cursor-pointer items-center justify-between gap-2 text-sm">
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={checked}
                                        onChange={() => {
                                            setShowAll(false);
                                            onChange({ category: node.id, specializations: [] });
                                        }}
                                        className="peer sr-only"
                                    />
                                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-main-10 peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                                        {checked && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                    </span>
                                    <span className="truncate transition-colors group-hover:text-primary">{node.title}</span>
                                </span>
                                <span className="text-xs text-primary">({node.count})</span>
                            </label>
                        );
                    })}
                </div>
            </FilterGroup>

            {options.length > 0 && (
                <FilterGroup title={t("categoryFilter.specialization")}>
                    <div className="flex flex-col gap-2">
                        {visible.map((item) => (
                            <label key={item.id} className="group flex cursor-pointer items-center justify-between gap-2 text-sm">
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={specializations.includes(item.id)}
                                        onChange={() => toggle(item.id)}
                                        className="h-4 w-4 shrink-0 cursor-pointer rounded accent-primary"
                                    />
                                    <span className="truncate transition-colors group-hover:text-primary">{item.title}</span>
                                </span>
                                <span className="text-xs text-main-50">({item.count})</span>
                            </label>
                        ))}
                    </div>
                    {options.length > VISIBLE_SPECIALIZATIONS && (
                        <button type="button" onClick={() => setShowAll((current) => !current)} className="mt-2 border-b border-dashed border-primary text-[11px] text-primary">
                            {showAll ? t("categoryFilter.showLess") : t("categoryFilter.showMore")}
                        </button>
                    )}
                </FilterGroup>
            )}
        </>
    );
}
