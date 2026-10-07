import type { CategoryNode } from "@/features/categories/model/types";
import { IconClose } from "@/shared/components/svg/UiIcons";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

const VISIBLE_SPECIALIZATIONS = 5;

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

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="mt-5">
        <h3 className="mb-2.5 text-sm font-semibold">{title}</h3>
        {children}
    </div>
);

const Chip = ({ label, onRemove, removeLabel }: { label: string; onRemove: () => void; removeLabel: string }) => (
    <span className="flex max-w-full items-center gap-1.5 rounded-full border border-main-10 bg-background px-2.5 py-1 text-[11px]">
        <span className="truncate">{label}</span>
        <button type="button" onClick={onRemove} aria-label={`${removeLabel} ${label}`} className="shrink-0 text-status-danger hover:opacity-70">
            <IconClose size={12} />
        </button>
    </span>
);

export default function ProjectFilters({ tree, value, onChange }: ProjectFiltersProps) {
    const { t } = useTranslation("findWork");
    const [tagInput, setTagInput] = useState("");
    const [showAll, setShowAll] = useState(false);

    const selected = tree.find((node) => node.id === value.category) ?? null;
    const specializations = selected?.specializations ?? [];
    const visibleSpecializations = showAll ? specializations : specializations.slice(0, VISIBLE_SPECIALIZATIONS);
    const titleOf = (id: string) => specializations.find((item) => item.id === id)?.title ?? "";

    const set = (patch: Partial<ProjectFilterState>) => onChange({ ...value, ...patch });

    const toggleSpecialization = (id: string) =>
        set({ specializations: value.specializations.includes(id) ? value.specializations.filter((item) => item !== id) : [...value.specializations, id] });

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
                    {selected && <Chip label={selected.title} onRemove={() => set({ category: null, specializations: [] })} removeLabel={t("findWork.removeFilter")} />}
                    {value.specializations.map((id) => (
                        <Chip key={id} label={titleOf(id)} onRemove={() => toggleSpecialization(id)} removeLabel={t("findWork.removeFilter")} />
                    ))}
                    {value.tags.map((tag) => (
                        <Chip key={tag} label={`#${tag}`} onRemove={() => set({ tags: value.tags.filter((item) => item !== tag) })} removeLabel={t("findWork.removeFilter")} />
                    ))}
                    {(value.minPrice || value.maxPrice) && (
                        <Chip label={`$${value.minPrice || "0"} – $${value.maxPrice || "∞"}`} onRemove={() => set({ minPrice: "", maxPrice: "" })} removeLabel={t("findWork.removeFilter")} />
                    )}
                </div>
            )}

            <Group title={t("findWork.category")}>
                <div role="radiogroup" className="flex flex-col gap-2">
                    {tree.map((node) => {
                        const checked = node.id === value.category;
                        return (
                            <label key={node.id} className="group flex cursor-pointer items-center justify-between gap-2 text-sm">
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={checked}
                                        onChange={() => {
                                            setShowAll(false);
                                            set({ category: node.id, specializations: [] });
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
            </Group>

            {specializations.length > 0 && (
                <Group title={t("findWork.specialization")}>
                    <div className="flex flex-col gap-2">
                        {visibleSpecializations.map((item) => (
                            <label key={item.id} className="group flex cursor-pointer items-center justify-between gap-2 text-sm">
                                <span className="flex min-w-0 items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={value.specializations.includes(item.id)}
                                        onChange={() => toggleSpecialization(item.id)}
                                        className="h-4 w-4 shrink-0 cursor-pointer rounded accent-primary"
                                    />
                                    <span className="truncate transition-colors group-hover:text-primary">{item.title}</span>
                                </span>
                                <span className="text-xs text-main-50">({item.count})</span>
                            </label>
                        ))}
                    </div>
                    {specializations.length > VISIBLE_SPECIALIZATIONS && (
                        <button type="button" onClick={() => setShowAll((current) => !current)} className="mt-2 border-b border-dashed border-primary text-[11px] text-primary">
                            {showAll ? t("findWork.showLess") : t("findWork.showMore")}
                        </button>
                    )}
                </Group>
            )}

            <Group title={t("findWork.tags")}>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={onTagKeyDown}
                    placeholder={t("findWork.tagsPlaceholder")}
                    className="h-[42px] w-full rounded-20 border border-main-10 bg-background px-4 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary"
                />
            </Group>

            <Group title={t("findWork.budget")}>
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
            </Group>
        </aside>
    );
}
