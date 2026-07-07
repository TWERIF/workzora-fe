import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getVisiblePages = (page: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
        return [1, 2, 3, "…", totalPages];
    }

    if (page >= totalPages - 2) {
        return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "…", page, "…", totalPages];
};

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    const { t } = useTranslation("common");

    if (totalPages <= 1) return null;

    return (
        <nav
            aria-label={t("blog.pagination.label")}
            className="flex items-center justify-center gap-2"
        >
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label={t("blog.pagination.prev")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text disabled:opacity-40 dark:text-text-dark"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {getVisiblePages(page, totalPages).map((item, index) =>
                item === "…" ? (
                    <span key={`ellipsis-${index}`} className="px-1 text-muted">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item as number)}
                        aria-current={item === page ? "page" : undefined}
                        className={[
                            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium",
                            item === page
                                ? "bg-gradient text-white"
                                : "border border-border text-text dark:text-text-dark",
                        ].join(" ")}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label={t("blog.pagination.next")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text disabled:opacity-40 dark:text-text-dark"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
};
