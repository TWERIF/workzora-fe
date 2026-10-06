import PaginationArrowIcon from "@/shared/components/svg/Profile/PaginationArrowIcon";
import { useTranslation } from "react-i18next";

interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange?: (page: number) => void;
}

/**
 * Figma shows "1 2 3 ... 6": up to 5 pages are listed in full, otherwise the current
 * page with its neighbours plus the first/last page, gaps collapsed into "...".
 */
const getPageItems = (page: number, pageCount: number): (number | "...")[] => {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, "...", pageCount];
    if (page >= pageCount - 2) return [1, "...", pageCount - 2, pageCount - 1, pageCount];
    return [1, "...", page - 1, page, page + 1, "...", pageCount];
};

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
    const { t } = useTranslation("common");

    if (pageCount <= 1) return null;

    const pages = getPageItems(page, pageCount);

    const pageClasses = (isActive: boolean) =>
        `flex size-[49px] items-center justify-center rounded-full border p-[10px] text-base leading-[29px] ${isActive
            ? "border-success text-success"
            : "border-surface text-text-light dark:border-white/10"
        }`;

    return (
        <div className="flex items-center justify-between gap-3">
            <button
                type="button"
                aria-label={t("profile.pagination.previous")}
                disabled={page <= 1}
                onClick={() => onPageChange?.(page - 1)}
                className="shrink-0 disabled:opacity-30"
            >
                <PaginationArrowIcon className="-scale-x-100" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="flex size-[49px] items-center justify-center text-base text-text-light"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onPageChange?.(p)}
                            aria-current={p === page ? "page" : undefined}
                            className={pageClasses(p === page)}
                        >
                            {p}
                        </button>
                    ),
                )}
            </div>

            <button
                type="button"
                aria-label={t("profile.pagination.next")}
                disabled={page >= pageCount}
                onClick={() => onPageChange?.(page + 1)}
                className="shrink-0 disabled:opacity-30"
            >
                <PaginationArrowIcon />
            </button>
        </div>
    );
};
