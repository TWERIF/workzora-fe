"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Category } from "@/features/categories/model/types";
import { useCategoriesSearch } from "@/features/categories/model/useData";
import CloseIcon from "@/shared/components/svg/CloseIcon";
import PlusIcon from "@/shared/components/svg/PlusIcon";
import SearchIcon from "@/shared/components/svg/SearchIcon";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { fieldClass, labelClass } from "../model/fieldStyles";


const MAX_CATEGORIES = 3;
const CATEGORIES_LIMIT = 50;

interface CategoryPickerProps {
    value: string[];
    onChange: (ids: string[]) => void;
    error?: string;
}

export default function CategoryPicker({ value, onChange, error }: CategoryPickerProps) {
    const { t } = useTranslation("createProject");

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [titles, setTitles] = useState<Record<string, string>>({});

    const { data: categoriesResult } = useCategoriesSearch({
        search,
        page: 1,
        limit: CATEGORIES_LIMIT,
    });

    const categories: Category[] = categoriesResult?.items ?? [];
    const available = categories.filter((category) => !value.includes(category.id));
    const limitReached = value.length >= MAX_CATEGORIES;
    const nothingFound = categoriesResult !== undefined && categories.length === 0;

    const applySearch = () => setSearch(searchInput.trim());

    const handleSearchInputChange = (next: string) => {
        setSearchInput(next);
        if (next === "") setSearch("");
    };

    const addCategory = (category: Category) => {
        if (limitReached || value.includes(category.id)) return;
        setTitles((prev) => ({ ...prev, [category.id]: category.title }));
        onChange([...value, category.id]);
    };

    const removeCategory = (id: string) => onChange(value.filter((item) => item !== id));

    return (
        <div>
            <label htmlFor="category-search" className={labelClass}>
                {t("form.categories_label")}
            </label>

            <div className="flex gap-3">
                <div className="relative min-w-0 flex-1">
                    <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-success" />
                    <input
                        id="category-search"
                        type="text"
                        enterKeyHint="search"
                        autoComplete="off"
                        value={searchInput}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                        onKeyDown={(e) => {
                            // Enter у полі пошуку не має відправляти всю форму
                            if (e.key === "Enter") {
                                e.preventDefault();
                                applySearch();
                            }
                        }}
                        placeholder={t("form.categories_search_placeholder")}
                        className={`${fieldClass(false)} h-[52px] pl-11 pr-4`}
                    />
                </div>
                <ButtonGradient
                    type="button"
                    text={t("form.categories_search_button")}
                    onClick={applySearch}
                    className="shrink-0 !px-6 sm:!px-[50px]"
                />
            </div>

            <div
                role="group"
                aria-label={t("form.categories_label")}
                className="mt-3 grid min-h-[80px] grid-cols-1 gap-3 rounded-[40px] bg-bg p-3 dark:bg-bg-modalDark sm:grid-cols-3"
            >
                {value.length === 0 ? (
                    <p className="col-span-full flex items-center justify-center px-4 text-center text-sm text-text-muted">
                        {t("form.categories_empty_selected")}
                    </p>
                ) : (
                    value.map((id) => {
                        const title = titles[id] ?? id;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => removeCategory(id)}
                                aria-label={t("form.categories_remove", { title })}
                                className="group flex h-14 min-w-0 items-center justify-center gap-3 rounded-full bg-input px-5 text-base text-text transition-colors hover:text-success dark:bg-bg-dark dark:text-text-dark dark:hover:text-success"
                            >
                                <span className="truncate">{title}</span>
                                <CloseIcon className="h-3 w-3 shrink-0 text-text-muted transition-colors group-hover:text-error" />
                            </button>
                        );
                    })
                )}
            </div>

            <div className="mt-2 flex items-start justify-between gap-4 text-xs">
                {error ? (
                    <p role="alert" className="text-error">
                        {error}
                    </p>
                ) : (
                    <span />
                )}
                <span className="shrink-0 text-text-muted">
                    {t("form.categories_selected", { current: value.length, max: MAX_CATEGORIES })}
                </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
                {available.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        disabled={limitReached}
                        onClick={() => addCategory(category)}
                        className="flex h-14 items-center gap-3 rounded-full border border-border/50 bg-input px-5 text-base text-text transition-colors enabled:hover:border-success disabled:cursor-not-allowed disabled:opacity-50 dark:border-border/[0.12] dark:bg-bg-dark dark:text-text-dark dark:enabled:hover:border-success sm:px-8"
                    >
                        <span>{category.title}</span>
                        <PlusIcon className="h-[18px] w-[18px] shrink-0 text-success" />
                    </button>
                ))}
            </div>

            {nothingFound && (
                <p className="mt-3 text-sm text-text-muted">{t("form.categories_not_found")}</p>
            )}
        </div>
    );
}
