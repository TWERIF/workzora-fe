import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Post } from "../model/types";
import { useLatestPosts } from "../model/usePosts";
import { useRouter } from "next/navigation";


export const PopularSidebar = () => {
    const { t } = useTranslation("common");
    const { data: posts, isLoading } = useLatestPosts();
    const router = useRouter();

    return (
        <aside className="flex flex-col gap-4 rounded-20 border border-border bg-input p-15 py-13 dark:bg-input-dark">
            <h3 className="text-base font-semibold text-text dark:text-text-dark">
                {t("blog.popular.title")}
            </h3>

            <div className="flex flex-col gap-4">
                {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-12 animate-pulse rounded-20 bg-bg dark:bg-bg-dark"
                        />
                    ))}

                {!isLoading &&
                    (posts as Post[])?.slice(0, 5).map((post) => (
                        <div onClick={() => router.push(`/news/${post.id}`)} key={post.id} className="flex items-center gap-3">
                            <div
                                className="h-12 w-12 shrink-0 rounded-20 bg-gradient bg-cover bg-center"
                                style={
                                    post.imageUrl
                                        ? { backgroundImage: `url(${post.imageUrl})` }
                                        : undefined
                                }
                            />
                            <div className="flex flex-col gap-1">
                                <span className="line-clamp-2 text-sm font-medium text-text dark:text-text-dark">
                                    {post.title}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted">
                                    <Clock className="h-3 w-3" />
                                    {t("blog.minRead", { count: post.minutesToRead })}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </aside>
    );
};
