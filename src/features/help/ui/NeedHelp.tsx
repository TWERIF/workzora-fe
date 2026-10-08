import { Info } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NeedHelp() {
    const { t } = useTranslation("help");
    return (
        <aside className="mt-10 rounded-20 border border-primary/30 bg-primary-10 px-5 py-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Info size={16} />
                {t("article.needHelp")}
            </p>
            <p className="mt-2 text-[13px] text-main-50">
                {t("article.needHelpText")}{" "}
                <Link href="/contacts" className="text-primary hover:underline">
                    {t("article.contactSupport")}
                </Link>
            </p>
        </aside>
    );
}
