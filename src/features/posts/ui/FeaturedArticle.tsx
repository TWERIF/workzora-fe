import { formatPostDate } from "@/utils/formatPostDate";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Post } from "../model/types";


interface FeaturedArticleProps {
    post: Post;
}

export const FeaturedArticle = ({ post }: FeaturedArticleProps) => {
    const { t, i18n } = useTranslation("common");
    const router = useRouter();

    return (
        <article onClick={() => router.push(`/news/${post.id}`)} className="grid gap-6 rounded-20 border border-border bg-input p-6 dark:bg-input-dark sm:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-4">
                <span className="w-fit rounded-20 bg-bg px-15 py-1 text-xs font-medium text-success dark:bg-bg-dark">
                    {t("blog.featured.label")}
                </span>

                <h2 className="text-2xl font-semibold leading-snug text-text dark:text-text-dark">
                    {post.title}
                </h2>

                <div className="line-clamp-2 text-sm text-muted" dangerouslySetInnerHTML={{ __html: post.teaser }} />

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient" />
                        <span className="text-sm font-medium text-text dark:text-text-dark">
                            {t("blog.authorName")}
                        </span>
                    </div>

                    <span className="text-xs text-muted">
                        {formatPostDate(post.createdAt, i18n.language)}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {t("blog.minRead", { count: post.minutesToRead })}
                    </span>

                    <button
                        type="button"
                        className="ml-auto rounded-20 bg-gradient px-15 py-2 text-sm font-medium text-white"
                    >
                        {t("blog.readMore")}
                    </button>
                </div>
            </div>

            <div
                className="min-h-[200px] rounded-20 bg-gradient bg-cover bg-center"
                style={
                    post.imageUrl
                        ? { backgroundImage: `url(${post.imageUrl})` }
                        : undefined
                }
            />
        </article>
    );
};
