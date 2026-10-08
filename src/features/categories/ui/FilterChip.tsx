import { IconClose } from "@/shared/components/svg/UiIcons";
import { useTranslation } from "react-i18next";

export default function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    const { t } = useTranslation("common");
    return (
        <span className="flex max-w-full items-center gap-1.5 rounded-full border border-main-10 bg-background px-2.5 py-1 text-[11px]">
            <span className="truncate">{label}</span>
            <button type="button" onClick={onRemove} aria-label={t("categoryFilter.remove", { label })} className="shrink-0 text-status-danger hover:opacity-70">
                <IconClose size={12} />
            </button>
        </span>
    );
}
