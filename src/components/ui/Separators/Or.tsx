import { useTranslation } from "react-i18next";

export default function Or() {
    const { t } = useTranslation("common");
    return (
        <div className="flex gap-[17px] text-text dark:text-text-dark w-full items-center">
            <div className="flex-1 h-[1px] bg-[#C8C7C7]" />
            {t("separators.or")}
            <div className="flex-1 h-[1px] bg-[#C8C7C7]" />
        </div>
    )
}