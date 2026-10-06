import { useTranslation } from "react-i18next";

export const HistoryEmpty = () => {
    const { t } = useTranslation("finances");

    return (
        <div className="rounded-20 border border-dashed border-border p-10 text-center dark:border-white/15">
            <p className="font-medium text-text dark:text-text-dark">
                {t("history.empty.title")}
            </p>
            <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                {t("history.empty.description")}
            </p>
        </div>
    );
};

export default HistoryEmpty;
