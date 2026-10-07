import type { PortfolioItem } from "@/features/portfolio/model/types";
import { IconClose } from "@/shared/components/svg/UiIcons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PortfolioPreview({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
    const { t } = useTranslation("profile");

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
            <article
                role="dialog"
                aria-modal="true"
                aria-label={item.title}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-[24px] bg-background text-main-100"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t("portfolioModal.close")}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-main-100 shadow-sm backdrop-blur transition-colors hover:text-status-danger"
                >
                    <IconClose size={20} />
                </button>
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full rounded-t-[24px] object-contain" />}
                <div className="flex flex-col gap-3 p-6">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    {item.tags && item.tags.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                                <li key={tag} className="rounded-full bg-primary-10 px-3 py-1 text-xs text-primary">
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    )}
                    {item.description && <p className="whitespace-pre-line break-words text-sm leading-6">{item.description}</p>}
                </div>
            </article>
        </div>
    );
}
