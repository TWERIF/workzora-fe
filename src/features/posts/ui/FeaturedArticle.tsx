import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Post, postPath } from "../model/types";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";

export const FeaturedArticle = ({ post }: { post: Post }) => {
    const { t } = useTranslation("common");

    return (
        <article className="grid overflow-hidden rounded-36 bg-main-5 sm:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex flex-col gap-4 p-6 sm:p-9">
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs text-primary">
                    <Sparkles size={12} />
                    {t("blog.featured.label")}
                </span>
                <h2 className="break-words text-2xl font-semibold leading-snug">
                    <Link href={postPath(post)} className="hover:text-primary">
                        {post.title}
                    </Link>
                </h2>
                <div className="line-clamp-3 break-words text-sm leading-6" dangerouslySetInnerHTML={{ __html: post.teaser }} />
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                            <WorkzoraMarkIcon w={24} h={24} />
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">{t("blog.authorName")}</span>
                            <PostMeta post={post} withDate />
                        </div>
                    </div>
                    <Link href={postPath(post)} className="rounded-full bg-gradient px-6 py-3 text-sm text-white transition-opacity hover:opacity-90">
                        {t("blog.readMore")}
                    </Link>
                </div>
            </div>
            <Link href={postPath(post)} tabIndex={-1} aria-hidden className="order-first block sm:order-none">
                <PostCover src={post.imageUrl} alt="" className="h-56 w-full sm:h-full" />
            </Link>
        </article>
    );
};
