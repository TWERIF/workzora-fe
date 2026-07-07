import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export const BackToBlogLink = () => {
    const { t } = useTranslation("common");

    return (
        <Link
            href="/news"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-text hover:text-success dark:text-text-dark"
        >
            <ArrowLeft className="h-4 w-4" />
            {t("post.backToBlog")}
        </Link>
    );
};
