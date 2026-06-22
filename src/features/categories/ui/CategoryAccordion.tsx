"use client";

import { useState } from "react";
import { useCategoriesList } from "../model/useData";

// Іконка тепер використовує адаптивний text-success колір
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`w-5 h-5 transition-transform duration-200 text-success ${isOpen ? "transform rotate-180" : ""
            }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export default function CategoryAccordion() {
    const { data } = useCategoriesList();
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
        "2": true,
    });

    const toggleCategory = (id: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="w-full font-sans text-text dark:text-text-dark">
            {data?.items?.map((category) => {
                const isOpen = openCategories[category.id] || false;

                return (
                    <div key={category.id} className="border-b border-gray-200 dark:border-zinc-700 last:border-0">
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 dark:hover:bg-bg-modalDark/50 transition-colors focus:outline-none"
                        >
                            <h2 className="text-lg font-bold">
                                {category.title} <span className="text-success">({category.count})</span>
                            </h2>
                            <ChevronIcon isOpen={isOpen} />
                        </button>

                        {isOpen && category.subcategories.length > 0 && (
                            <div className="pb-6 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                                    {category.subcategories.map((sub, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-sm text-text-muted dark:text-gray-400 hover:text-text dark:hover:text-text-dark cursor-pointer transition-colors"
                                        >
                                            <span>{sub.name}</span>
                                            <span className="ml-1 text-success">({sub.count})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}