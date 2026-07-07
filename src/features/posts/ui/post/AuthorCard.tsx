import { useTranslation } from "react-i18next";

export const AuthorCard = () => {
    const { t } = useTranslation("common");

    return (
        <div className="flex items-center gap-3 rounded-20 border border-border bg-input p-15 py-13 dark:bg-input-dark">
            <div className="h-12 w-12 shrink-0 rounded-full bg-gradient" />
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-text dark:text-text-dark">
                    {t("blog.authorName")}
                </span>
                <span className="text-xs text-muted">{t("post.authorRole")}</span>
            </div>
        </div>
    );
};
