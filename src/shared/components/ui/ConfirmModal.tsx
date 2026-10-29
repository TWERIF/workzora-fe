import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    isLoading?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmModal({
    isOpen,
    title,
    description,
    confirmLabel,
    cancelLabel,
    danger = false,
    isLoading = false,
    onConfirm,
    onClose,
}: ConfirmModalProps) {
    const { t } = useTranslation("common");

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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
            <div
                role="alertdialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded-22 bg-white p-6 text-main-100 shadow-card dark:bg-bg-modalDark dark:shadow-card-dark"
            >
                <h2 className="text-lg font-semibold">{title}</h2>
                {description && <p className="mt-2 text-sm text-main-50">{description}</p>}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="h-[45px] rounded-full border border-main-10 px-6 text-sm transition-colors hover:bg-main-5 disabled:opacity-50"
                    >
                        {cancelLabel ?? t("confirmModal.cancel")}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`h-[45px] rounded-full px-6 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${danger ? "bg-status-danger" : "bg-gradient"}`}
                    >
                        {confirmLabel ?? t("confirmModal.confirm")}
                    </button>
                </div>
            </div>
        </div>
    );
}
