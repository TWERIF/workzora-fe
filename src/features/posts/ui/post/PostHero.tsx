import { useTranslation } from "react-i18next";
import { blogTagKey, Post } from "../../model/types";

export const PostHero = ({ post }: { post: Post }) => {
    const { t } = useTranslation("common");
    const tagKey = blogTagKey(post.tag);

    return (
        <header className="flex flex-col items-center gap-5 text-center">
            <span className="rounded-full bg-primary px-4 py-2 text-xs text-white">
                {tagKey ? t(`blog.categories.${tagKey}`) : t("post.categoryFallback")}
            </span>
            <h1 className="max-w-[1126px] break-words text-3xl font-bold leading-tight sm:text-5xl lg:text-[55px] lg:leading-[82px]">{post.title}</h1>
            <div className="max-w-[748px] break-words text-base leading-relaxed sm:text-lg sm:leading-[27px]" dangerouslySetInnerHTML={{ __html: post.teaser }} />
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="mt-6 h-[240px] w-[min(1720px,calc(100vw-32px))] max-w-none shrink-0 rounded-[24px] object-cover sm:h-[420px] lg:h-[571px] lg:rounded-[48px]" />
            )}
        </header>
    );
};
