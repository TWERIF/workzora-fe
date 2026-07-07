import { useTranslation } from "react-i18next";
import { PaginatedPosts } from "../model/types-paginated-posts";
import { usePostList } from "../model/usePosts";
import { PostCard } from "./PostCard";


interface PostsGridProps {
    page: number;
    limit?: number;
}

const SKELETON_COUNT = 6;

export const PostsGrid = ({ page, limit = 9 }: PostsGridProps) => {
    const { t } = useTranslation("common");
    const { data, isLoading } = usePostList(page, limit) as {
        data?: PaginatedPosts;
        isLoading: boolean;
    };

    const posts = data?.items ?? [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <div
                        key={index}
                        className="h-[280px] animate-pulse rounded-20 border border-border bg-input dark:bg-input-dark"
                    />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <p className="py-10 text-center text-sm text-muted">
                {t("blog.emptyState")}
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
