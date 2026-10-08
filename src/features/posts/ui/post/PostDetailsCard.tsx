import { formatPostDate } from "@/utils/formatPostDate";
import { CalendarDays, Clock, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Post } from "../../model/types";

export const PostDetailsCard = ({ post }: { post: Post }) => {
    const { t, i18n } = useTranslation("common");
    const rows = [
        { icon: Clock, label: t("post.details.readTime"), value: t("blog.minRead", { count: post.minutesToRead }) },
        { icon: CalendarDays, label: t("post.details.postDate"), value: formatPostDate(post.createdAt, i18n.language) },
        { icon: Eye, label: t("post.details.viewer"), value: (post.views ?? 0).toLocaleString(i18n.language?.startsWith("uk") ? "uk-UA" : "en-US") },
    ];

    return (
        <section className="flex flex-col gap-4 rounded-[24px] bg-main-5 p-5">
            <h2 className="text-base font-semibold">{t("post.details.title")}</h2>
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
};
