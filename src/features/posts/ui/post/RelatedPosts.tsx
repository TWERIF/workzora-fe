import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePostList } from "../../model/usePosts";
import { PostCard } from "../PostCard";

export const RelatedPosts = ({ currentPostId }: { currentPostId: string }) => {
    const { t } = useTranslation("common");
    const track = useRef<HTMLDivElement>(null);
    const { data } = usePostList({ page: 1, limit: 8, exclude: currentPostId });
    const posts = data?.data ?? [];

    if (posts.length === 0) return null;

    const scroll = (direction: 1 | -1) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: "smooth" });

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold sm:text-[40px]">{t("post.readAlso")}</h2>
                {posts.length > 1 && (
                    <div className="flex gap-2">
                        <button type="button" onClick={() => scroll(-1)} aria-label={t("blog.pagination.prev")} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:opacity-90">
                            <ChevronLeft size={18} />
                        </button>
                        <button type="button" onClick={() => scroll(1)} aria-label={t("blog.pagination.next")} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:opacity-90">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
            <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {posts.map((post) => (
                    <div key={post.id} className="w-[280px] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)]">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </section>
    );
};
