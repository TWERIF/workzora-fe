import { formatPostDate } from "@/utils/formatPostDate";
import { CalendarDays, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HelpArticle } from "../model/types";

export default function HelpDetails({ article }: { article: HelpArticle }) {
    const { t, i18n } = useTranslation("help");
    const rows = [
        { icon: Clock, label: t("article.readTime"), value: t("article.minutes", { count: article.minutesToRead }) },
        { icon: CalendarDays, label: t("article.updated"), value: formatPostDate(article.updatedAt, i18n.language) },
    ];

    return (
        <section className="flex flex-col gap-4 rounded-[24px] bg-main-5 p-5">
            <h2 className="text-base font-semibold">{t("article.details")}</h2>
            <dl className="flex flex-col gap-2">
                {rows.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-3 rounded-xl bg-background px-3 py-2.5 text-xs">
                        <dt className="flex items-center gap-2 text-main-50">
                            <Icon size={15} className="text-primary" />
                            {label}
                        </dt>
                        <dd className="font-medium">{value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
