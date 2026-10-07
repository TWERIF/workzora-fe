import { formatPostDate } from "@/utils/formatPostDate";
import { CalendarDays, Clock, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Post } from "../model/types";

export const PostMeta = ({ post, withDate = false }: { post: Post; withDate?: boolean }) => {
    const { t, i18n } = useTranslation("common");
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-main-50">
            {withDate && (
                <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-primary" />
                    {formatPostDate(post.createdAt, i18n.language)}
                </span>
            )}
            <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" />
                {t("blog.minRead", { count: post.minutesToRead })}
            </span>
            <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-primary" />
                {(post.views ?? 0).toLocaleString(i18n.language?.startsWith("uk") ? "uk-UA" : "en-US")}
            </span>
        </div>
    );
};
