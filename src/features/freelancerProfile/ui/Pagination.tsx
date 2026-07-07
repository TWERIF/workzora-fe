import { useTranslation } from "react-i18next";
import { ChevronIcon } from "./icons";

interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange?: (page: number) => void;
}

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
    const { t } = useTranslation("common");

    if (pageCount <= 1) return null;

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1).slice(0, 3);
    const showEllipsis = pageCount > 4;

    return (
        <div className="mt-4 flex items-center justify-center gap-2">
            <button
                type="button"
                aria-label={t("profile.pagination.previous")}
                disabled={page <= 1}
                onClick={() => onPageChange?.(page - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted disabled:opacity-40"
            >
                <ChevronIcon className="h-3.5 w-3.5 rotate-180" />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onPageChange?.(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${p === page
                            ? "border-success text-success"
                            : "border-border text-text-muted"
                        }`}
                >
                    {p}
                </button>
            ))}

            {showEllipsis && <span className="px-1 text-text-muted">…</span>}
            {showEllipsis && (
                <button
                    type="button"
                    onClick={() => onPageChange?.(pageCount)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm text-text-muted"
                >
                    {pageCount}
                </button>
            )}

            <button
                type="button"
                aria-label={t("profile.pagination.next")}
                disabled={page >= pageCount}
                onClick={() => onPageChange?.(page + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted disabled:opacity-40"
            >
                <ChevronIcon className="h-3.5 w-3.5" />
            </button>
        </div>
    );
};