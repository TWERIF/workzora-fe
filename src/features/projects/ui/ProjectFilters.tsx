import type { CategoryNode } from "@/features/categories/model/types";
import CategoryTreeFilter, { FilterGroup, selectionChips } from "@/features/categories/ui/CategoryTreeFilter";
import FilterChip from "@/features/categories/ui/FilterChip";
import { useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

export interface ProjectFilterState {
    category: string | null;
    specializations: string[];
    tags: string[];
    minPrice: string;
    maxPrice: string;
}

export const EMPTY_FILTERS: ProjectFilterState = { category: null, specializations: [], tags: [], minPrice: "", maxPrice: "" };

interface ProjectFiltersProps {
    tree: CategoryNode[];
    value: ProjectFilterState;
    onChange: (next: ProjectFilterState) => void;
}

export default function ProjectFilters({ tree, value, onChange }: ProjectFiltersProps) {
    const { t } = useTranslation("findWork");
    const [tagInput, setTagInput] = useState("");

    const set = (patch: Partial<ProjectFilterState>) => onChange({ ...value, ...patch });

    const onTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const tag = tagInput.trim().replace(/^#/, "");
        if (event.key === "Enter" && tag) {
            event.preventDefault();
            if (!value.tags.includes(tag)) set({ tags: [...value.tags, tag] });
            setTagInput("");
        }
    };

    const hasFilters = Boolean(value.category || value.tags.length || value.minPrice || value.maxPrice);

    return (
        <aside className="h-fit w-full shrink-0 rounded-20 border border-main-10 bg-background p-4 lg:w-[272px]">
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">{t("findWork.filters")}</h2>
                {hasFilters && (
                    <button type="button" onClick={() => onChange(EMPTY_FILTERS)} className="border-b border-dashed border-status-danger text-[11px] text-status-danger">
                        {t("findWork.clearAll")}
                    </button>
                )}
            </div>

            {hasFilters && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectionChips(tree, value).map((chip) => (
                        <FilterChip key={chip.id} label={chip.label} onRemove={() => set(chip.next)} />
                    ))}
                    {value.tags.map((tag) => (
                        <FilterChip key={tag} label={`#${tag}`} onRemove={() => set({ tags: value.tags.filter((item) => item !== tag) })} />
                    ))}
                    {(value.minPrice || value.maxPrice) && (
                        <FilterChip label={`$${value.minPrice || "0"} – $${value.maxPrice || "∞"}`} onRemove={() => set({ minPrice: "", maxPrice: "" })} />
                    )}
                </div>
            )}

            <CategoryTreeFilter tree={tree} category={value.category} specializations={value.specializations} onChange={set} />

            <FilterGroup title={t("findWork.tags")}>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={onTagKeyDown}
                    placeholder={t("findWork.tagsPlaceholder")}
                    className="h-[42px] w-full rounded-20 border border-main-10 bg-background px-4 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary"
                />
            </FilterGroup>

            <FilterGroup title={t("findWork.budget")}>
                <div className="flex items-center gap-2">
                    {(["minPrice", "maxPrice"] as const).map((key) => (
                        <label key={key} className="flex h-[42px] min-w-0 flex-1 items-center gap-1 rounded-20 border border-main-10 px-3 text-sm focus-within:border-primary">
                            <span className="text-main-50">$</span>
                            <input
                                type="number"
                                min={0}
                                inputMode="decimal"
                                value={value[key]}
                                onChange={(event) => set({ [key]: event.target.value })}
                                placeholder={t(key === "minPrice" ? "findWork.from" : "findWork.to")}
                                aria-label={t(key === "minPrice" ? "findWork.from" : "findWork.to")}
                                className="w-full min-w-0 bg-transparent outline-none placeholder:text-main-50"
                            />
                        </label>
                    ))}
                </div>
            </FilterGroup>
        </aside>
    );
}
