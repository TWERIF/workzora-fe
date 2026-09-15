import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getPageList = (page: number, totalPages: number): (number | "...")[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

    const result: (number | "...")[] = [];
    sorted.forEach((p, idx) => {
        if (idx > 0 && p - (sorted[idx - 1] as number) > 1) {
            result.push("...");
        }
        result.push(p);
    });

    return result;
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = getPageList(page, totalPages);

    return (
        <div className="flex items-center justify-center gap-3 mt-8">
            <button
                type="button"
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="w-9 h-9 rounded-full border border-success flex items-center justify-center text-success disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={18} />
            </button>

            {pages.map((p, idx) =>
                p === "..." ? (
                    <span key={`dots-${idx}`} className="text-text-light dark:text-text-muted px-1">
                        ...
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onPageChange(p)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${
                            p === page
                                ? "border border-success text-success font-semibold"
                                : "text-text dark:text-text-dark hover:text-success"
                        }`}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                type="button"
                aria-label="Next page"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="w-9 h-9 rounded-full bg-success flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}