import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const BackToBlogLink = () => {
    const { t } = useTranslation("common");

    return (
        <Link href="/news" className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient px-6 py-3 text-sm text-white transition-opacity hover:opacity-90">
            <ArrowLeft className="h-4 w-4" />
            {t("post.backToBlog")}
        </Link>
    );
};
