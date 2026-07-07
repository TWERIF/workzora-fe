import { formatPostDate } from "@/utils/formatPostDate";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Post } from "../model/types";


interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const { t, i18n } = useTranslation("common");
    const router = useRouter();

    return (
        <article onClick={() => router.push(`/news/${post.id}`)} className="flex flex-col overflow-hidden rounded-20 border border-border bg-input dark:bg-input-dark">
            <div
                className="h-40 w-full bg-gradient bg-cover bg-center"
                style={
                    post.imageUrl
                        ? { backgroundImage: `url(${post.imageUrl})` }
                        : undefined
                }
            />

            <div className="flex flex-1 flex-col gap-3 p-15 py-13">
                <div className="flex items-center gap-2 text-xs text-muted">
                    <div className="h-5 w-5 rounded-full bg-gradient" />
                    <span>{t("blog.authorName")}</span>
                    <span aria-hidden>·</span>
                    <span>{formatPostDate(post.createdAt, i18n.language)}</span>
                </div>

                <h3 className="line-clamp-2 text-base font-semibold text-text dark:text-text-dark">
                    {post.title}
                </h3>

                <div className="line-clamp-2 text-sm text-muted" dangerouslySetInnerHTML={{ __html: post.teaser }} />

                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1 text-xs text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {t("blog.minRead", { count: post.minutesToRead })}
                    </span>

                    <button
                        type="button"
                        className="rounded-20 bg-gradient px-15 py-1.5 text-xs font-medium text-white"
                    >
                        {t("blog.readMore")}
                    </button>
                </div>
            </div>
        </article>
    );
};
