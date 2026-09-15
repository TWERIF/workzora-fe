"use client";

import IconArrowSmall from "@/shared/components/svg/IconArrowSmall";
import { useTranslation } from "react-i18next";

interface ProjectsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, 2, 3, total]);
    if (current > 1 && current < total) pages.add(current);

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: (number | "...")[] = [];

    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) {
            result.push("...");
        }
        result.push(page);
    });

    return result;
}

export default function ProjectsPagination({
    currentPage,
    totalPages,
    onPageChange,
}: ProjectsPaginationProps) {
    const { t } = useTranslation("additions");

    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <nav
            aria-label={t("chats.pagination.title", "Pagination")}
            className="mt-8 flex items-center justify-center gap-3 pb-8"
        >
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={t("chats.pagination.prev")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-white transition-opacity disabled:opacity-30"
            >
                <span className="rotate-180">
                    <IconArrowSmall color="currentColor" />
                </span>
            </button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-1 text-sm text-text-muted">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${page === currentPage
                                    ? "border border-success text-success"
                                    : "text-text-muted hover:text-text dark:hover:text-text-dark"
                                }`}
                        >
                            {page}
                        </button>
                    ),
                )}
            </div>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label={t("chats.pagination.next")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-white transition-opacity disabled:opacity-30"
            >
                <IconArrowSmall color="currentColor" />
            </button>
        </nav>
    );
}