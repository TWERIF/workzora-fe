import { useTranslation } from "react-i18next";
import { Post } from "../../model/types";

interface PostHeroProps {
    post: Post;
}

export const PostHero = ({ post }: PostHeroProps) => {
    const { t } = useTranslation("common");

    return (
        <header className="flex flex-col gap-6">
            <span className="w-fit rounded-20 bg-gradient px-15 py-1 text-xs font-medium text-white">
                {t("post.categoryFallback")}
            </span>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-text dark:text-text-dark sm:text-4xl">
                {post.title}
            </h1>

            <div className="line-clamp-2 text-sm text-muted" dangerouslySetInnerHTML={{ __html: post.teaser }} />

            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-[260px] w-full rounded-20 object-cover sm:h-[360px]"
                />
            )}
        </header>
    );
};
