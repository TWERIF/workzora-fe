import { useEffect, type ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    closeLabel: string;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, title, closeLabel, onClose, children }: ModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded-20 bg-white p-6 shadow-card dark:bg-bg-modalDark dark:shadow-card-dark"
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-text dark:text-text-dark">
                        {title}
                    </h2>
                    <button
                        type="button"
                        aria-label={closeLabel}
                        onClick={onClose}
                        className="rounded-full p-1 text-text-light transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success dark:text-text-muted dark:hover:bg-white/10"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                                d="m5 5 10 10M15 5 5 15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
