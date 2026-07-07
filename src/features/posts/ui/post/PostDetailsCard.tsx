import { useTranslation } from "react-i18next";
import { Post } from "../../model/types";
import { formatPostDate } from "@/utils/formatPostDate";

interface PostDetailsCardProps {
    post: Post;
    viewCount?: number;
}

export const PostDetailsCard = ({ post, viewCount }: PostDetailsCardProps) => {
    const { t, i18n } = useTranslation("common");

    const rows: Array<{ label: string; value: string }> = [
        {
            label: t("post.details.readTime"),
            value: t("blog.minRead", { count: post.minutesToRead }),
        },
        {
            label: t("post.details.postDate"),
            value: formatPostDate(post.createdAt, i18n.language),
        },
    ];

    if (viewCount !== undefined) {
        rows.push({
            label: t("post.details.viewer"),
            value: viewCount.toLocaleString(i18n.language),
        });
    }

    return (
        <div className="flex flex-col gap-4 rounded-20 border border-border bg-input p-15 py-13 dark:bg-input-dark">
            <h3 className="text-base font-semibold text-text dark:text-text-dark">
                {t("post.details.title")}
            </h3>

            <dl className="flex flex-col gap-2">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                        <dt className="text-muted">{row.label}</dt>
                        <dd className="font-medium text-text dark:text-text-dark">{row.value}</dd>
                    </div>
                ))}
            </dl>

            <p className="text-sm italic text-muted">{t("post.missionText")}</p>
        </div>
    );
};
