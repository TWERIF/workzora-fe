import { useTranslation } from "react-i18next";
import { blogTagKey, Post } from "../../model/types";

export const PostHero = ({ post }: { post: Post }) => {
    const { t } = useTranslation("common");
    const tagKey = blogTagKey(post.tag);

    return (
        <header className="flex flex-col items-center gap-5 text-center">
            <span className="rounded-full bg-primary px-4 py-1.5 text-xs text-white">
                {tagKey ? t(`blog.categories.${tagKey}`) : t("post.categoryFallback")}
            </span>
            <h1 className="max-w-4xl break-words text-3xl font-bold leading-tight sm:text-[40px] lg:text-[48px]">{post.title}</h1>
            <div className="max-w-2xl break-words text-sm leading-6 sm:text-base" dangerouslySetInnerHTML={{ __html: post.teaser }} />
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="mt-6 h-[240px] w-full rounded-[24px] object-cover sm:h-[420px] lg:h-[560px] lg:rounded-36" />
            )}
        </header>
    );
};
