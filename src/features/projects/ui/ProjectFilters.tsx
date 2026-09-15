import { Category } from "@/features/categories/model/types";
import { TFunction } from "i18next";
import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface ProjectFiltersProps {
    t: TFunction<"additions", undefined>;
    categories: Category[];
    selectedCategories: string[];
    onToggleCategory: (categoryId: string) => void;
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
    minPrice: string;
    maxPrice: string;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}

export default function ProjectFilters({
    t,
    categories,
    selectedCategories,
    onToggleCategory,
    tags,
    onAddTag,
    onRemoveTag,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
}: ProjectFiltersProps) {
    const [tagInput, setTagInput] = useState("");

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            onAddTag(tagInput.trim());
            setTagInput("");
        }
    };

    return (
        <aside className="w-full lg:w-[300px] shrink-0 bg-bg-header dark:bg-bg-modalDark border border-border dark:border-border/20 rounded-20 px-15 py-13 h-fit transition-colors duration-200">
            <h2 className="font-bold text-lg text-text dark:text-text-dark">
                {t("findWork.filters")}
            </h2>

            {/* Category */}
            <div className="mt-5">
                <h3 className="font-semibold text-text dark:text-text-dark mb-3">
                    {t("findWork.category")}
                </h3>
                <div className="flex flex-col gap-3">
                    {categories.map((category) => {
                        const checked = selectedCategories.includes(category.id);
                        return (
                            <label
                                key={category.id}
                                className="flex items-center justify-between gap-2 cursor-pointer group"
                            >
                                <span className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => onToggleCategory(category.id)}
                                        className="w-4 h-4 rounded-full accent-success border-checkbox cursor-pointer"
                                    />
                                    <span className="text-sm text-text dark:text-text-dark group-hover:text-success transition-colors">
                                        {category.title}
                                    </span>
                                </span>
                                {typeof category.count === "number" && (
                                    <span className="text-sm text-success">({category.count})</span>
                                )}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
                <h3 className="font-semibold text-text dark:text-text-dark mb-3">
                    {t("findWork.tags")}
                </h3>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder={t("findWork.tagsPlaceholder")}
                    className="w-full rounded-full border border-border bg-input dark:bg-input-dark text-text dark:text-text-dark text-sm px-4 py-2 outline-none focus:border-success transition-colors"
                />
                {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium"
                            >
                                #{tag}
                                <button
                                    type="button"
                                    aria-label={t("findWork.removeTag")}
                                    onClick={() => onRemoveTag(tag)}
                                    className="hover:text-error transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Budget */}
            <div className="mt-6">
                <h3 className="font-semibold text-text dark:text-text-dark mb-3">
                    {t("findWork.budget")}
                </h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center flex-1 rounded-full border border-border bg-input dark:bg-input-dark px-3 py-2">
                        <span className="text-text-light dark:text-text-muted mr-1">$</span>
                        <input
                            type="number"
                            min={0}
                            value={minPrice}
                            onChange={(e) => onMinPriceChange(e.target.value)}
                            placeholder={t("findWork.from")}
                            className="w-full bg-transparent text-sm text-text dark:text-text-dark outline-none"
                        />
                    </div>
                    <div className="flex items-center flex-1 rounded-full border border-border bg-input dark:bg-input-dark px-3 py-2">
                        <span className="text-text-light dark:text-text-muted mr-1">$</span>
                        <input
                            type="number"
                            min={0}
                            value={maxPrice}
                            onChange={(e) => onMaxPriceChange(e.target.value)}
                            placeholder={t("findWork.to")}
                            className="w-full bg-transparent text-sm text-text dark:text-text-dark outline-none"
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}