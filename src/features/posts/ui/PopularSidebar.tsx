import { Clock } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { postPath } from "../model/types";
import { usePopularPosts } from "../model/usePosts";
import { PostCover } from "./PostCover";

export const PopularSidebar = () => {
    const { t } = useTranslation("common");
    const { data: posts = [], isLoading } = usePopularPosts();

    if (!isLoading && posts.length === 0) return null;

    return (
        <aside className="flex flex-col gap-4 rounded-22 bg-main-5 p-6">
            <h3 className="text-lg font-medium leading-[29px]">{t("blog.popular.title")}</h3>
            <ol className="flex flex-col gap-3">
                {isLoading
                    ? Array.from({ length: 4 }, (_, index) => <li key={index} className="h-[76px] animate-pulse rounded-2xl bg-background" />)
                    : posts.map((post) => (
                          <li key={post.id}>
                              <Link href={postPath(post)} className="group flex items-center gap-3">
                                  <PostCover src={post.imageUrl} alt="" className="h-[76px] w-[76px] shrink-0 rounded-2xl" />
                                  <span className="flex min-w-0 flex-col gap-1.5">
                                      <span className="line-clamp-2 break-words text-xs font-medium leading-5 group-hover:text-primary">{post.title}</span>
                                      <span className="flex items-center gap-1 text-[11px] font-medium text-main-50">
                                          <Clock size={14} className="text-primary" />
                                          {t("blog.minRead", { count: post.minutesToRead })}
                                      </span>
                                  </span>
                              </Link>
                          </li>
                      ))}
            </ol>
        </aside>
    );
};
