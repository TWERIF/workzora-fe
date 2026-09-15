import MoreIcon from "@/shared/components/svg/MoreIcon";
import { useEffect, useRef, useState } from "react";


export interface ActionsMenuItem {
    key: string;
    label: string;
    onSelect: () => void;
    danger?: boolean;
    disabled?: boolean;
}

interface ActionsMenuProps {
    label: string;
    items: ActionsMenuItem[];
}

export const ActionsMenu = ({ label, items }: ActionsMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                className="rounded-full p-2 text-text-light transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success dark:text-text-muted dark:hover:bg-white/10"
            >
                <MoreIcon />
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-2 min-w-[200px] overflow-hidden rounded-20 border border-border bg-white py-2 shadow-card dark:border-white/10 dark:bg-input-dark dark:shadow-card-dark"
                >
                    {items.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            role="menuitem"
                            disabled={item.disabled}
                            onClick={() => {
                                item.onSelect();
                                setIsOpen(false);
                            }}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/10 ${
                                item.danger
                                    ? "text-status-danger"
                                    : "text-text dark:text-text-dark"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActionsMenu;
