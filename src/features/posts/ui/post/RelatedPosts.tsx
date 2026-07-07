import { useTranslation } from "react-i18next";
import { Post } from "../../model/types";
import { useLatestPosts } from "../../model/usePosts";
import { PostCard } from "../PostCard";

interface RelatedPostsProps {
    currentPostId: string;
}

export const RelatedPosts = ({ currentPostId }: RelatedPostsProps) => {
    const { t } = useTranslation("common");
    const { data: posts } = useLatestPosts();

    const relatedPosts = (posts as Post[])?.filter((post) => post.id !== currentPostId).slice(0, 4);

    if (!relatedPosts || relatedPosts.length === 0) return null;

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-text dark:text-text-dark">
                {t("post.readAlso")}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
};
