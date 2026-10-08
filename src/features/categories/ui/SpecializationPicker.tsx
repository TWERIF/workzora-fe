import ScrollRow from "@/shared/components/ui/ScrollRow";
import type { CategoryNode } from "@/features/categories/model/types";
import { useCategoryTree } from "@/features/categories/model/useData";
import { IconCheck, IconSearch } from "@/shared/components/svg/UiIcons";
import { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface SpecializationPickerProps {
    label: string;
    max: number;
    value: string[];
    onChange: (ids: string[]) => void;
    error?: string;
}

interface Option {
    id: string;
    title: string;
}

const optionsOf = (node: CategoryNode): Option[] =>
    node.specializations.length ? node.specializations.map(({ id, title }) => ({ id, title })) : [{ id: node.id, title: node.title }];

export default function SpecializationPicker({ label, max, value, onChange, error }: SpecializationPickerProps) {
    const { t } = useTranslation("common");
    const inputId = useId();
    const { data: tree = [] } = useCategoryTree();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draft, setDraft] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!activeId && tree.length) setActiveId(tree[0].id);
    }, [tree, activeId]);

    const titles = useMemo(() => new Map(tree.flatMap((node) => [[node.id, node.title] as const, ...node.specializations.map((item) => [item.id, item.title] as const)])), [tree]);
    const needle = search.trim().toLowerCase();
    const options = needle
        ? tree.flatMap(optionsOf).filter((option) => option.title.toLowerCase().includes(needle))
        : optionsOf(tree.find((node) => node.id === activeId) ?? tree[0] ?? { id: "", title: "", description: "", count: 0, specializations: [] }).filter((option) => option.id);
    const limitReached = value.length >= max;

    const toggle = (id: string) => {
        if (value.includes(id)) onChange(value.filter((item) => item !== id));
        else if (!limitReached) onChange([...value, id]);
    };

    return (
        <div>
            <label htmlFor={inputId} className="mb-1.5 block text-sm">
                {label}
            </label>

            <div className="flex gap-2.5">
                <label className="flex h-[50px] min-w-0 flex-1 items-center gap-2 rounded-20 border border-main-10 bg-background px-4 focus-within:border-primary">
                    <IconSearch size={18} className="shrink-0 text-primary" />
                    <input
                        id={inputId}
                        type="search"
                        autoComplete="off"
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            if (!event.target.value) setSearch("");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                setSearch(draft);
                            }
                        }}
                        placeholder={t("specializationPicker.placeholder")}
                        className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                    />
                </label>
                <button type="button" onClick={() => setSearch(draft)} className="h-[50px] shrink-0 rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90 sm:px-12">
                    {t("specializationPicker.search")}
                </button>
            </div>

            {!needle && tree.length > 0 && (
                <ScrollRow role="tablist" wrapperClassName="mt-2.5" className="flex gap-2 rounded-full bg-main-5 p-2">
                    {tree.map((node) => {
                        const selectedHere = optionsOf(node).filter((option) => value.includes(option.id)).length;
                        return (
                            <button
                                key={node.id}
                                type="button"
                                role="tab"
                                aria-selected={node.id === activeId}
                                onClick={() => setActiveId(node.id)}
                                className={`h-[45px] min-w-[120px] flex-1 shrink-0 whitespace-nowrap rounded-full px-4 text-sm transition-colors ${
                                    node.id === activeId ? "bg-primary text-white" : "bg-background hover:text-primary"
                                }`}
                            >
                                {node.title}
                                {selectedHere > 0 && ` (${selectedHere})`}
                            </button>
                        );
                    })}
                </ScrollRow>
            )}

            <div role="group" aria-label={label} className="mt-3 flex flex-wrap gap-2">
                {options.map((option) => {
                    const checked = value.includes(option.id);
                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={checked}
                            disabled={!checked && limitReached}
                            onClick={() => toggle(option.id)}
                            className={`flex h-[45px] items-center gap-2 rounded-full border px-4 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                                checked ? "border-primary bg-primary-10 text-primary" : "border-main-10 bg-background enabled:hover:border-primary"
                            }`}
                        >
                            {option.title}
                            {checked ? <IconCheck size={16} /> : <span className="text-lg leading-none text-primary">+</span>}
                        </button>
                    );
                })}
                {needle && options.length === 0 && <p className="text-sm text-main-50">{t("specializationPicker.notFound")}</p>}
            </div>

            <div className="mt-2 flex items-start justify-between gap-4 text-xs">
                {error ? <p role="alert" className="text-status-danger">{error}</p> : <span className="min-w-0 truncate text-main-50">{value.map((id) => titles.get(id) ?? "").join(", ")}</span>}
                <span className="shrink-0 text-main-50">{t("specializationPicker.selected", { current: value.length, max })}</span>
            </div>
        </div>
    );
}
