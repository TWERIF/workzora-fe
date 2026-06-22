"use client";

interface ChatPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ChatPagination({ currentPage, totalPages, onPageChange }: ChatPaginationProps) {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex justify-center items-center gap-2 text-xs font-semibold mt-6 text-text-muted select-none">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="hover:text-success disabled:opacity-30 disabled:hover:text-text-muted transition-colors px-1"
      >
        «
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              isCurrent ? "text-success font-bold scale-110" : "hover:text-success"
            }`}
          >
            {page}
          </button>
        );
      })}

      <span className="px-1">...</span>
      
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="hover:text-success disabled:opacity-30 disabled:hover:text-text-muted transition-colors px-1"
      >
        »
      </button>
    </div>
  );
}   