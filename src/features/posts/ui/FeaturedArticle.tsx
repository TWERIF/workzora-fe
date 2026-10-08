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
        <article className="grid overflow-hidden rounded-22 bg-main-5 sm:grid-cols-[minmax(0,1fr)_363px]">
            <div className="flex flex-col gap-3 p-6 sm:p-9">
                <span className="flex h-[42px] w-fit items-center gap-1.5 rounded-full bg-background px-3 text-xs text-primary">
                    <Sparkles size={18} />
                    {t("blog.featured.label")}
                </span>
                <h2 className="break-words text-2xl font-medium leading-[33px]">
                    <Link href={postPath(post)} className="hover:text-primary">
                        {post.title}
                    </Link>
                </h2>
                <div className="line-clamp-3 break-words text-base leading-[26px]" dangerouslySetInnerHTML={{ __html: post.teaser }} />
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                    <div className="flex items-center gap-3">
                        <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-background">
                            <WorkzoraMarkIcon w={31} h={31} />
                        </span>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-base font-medium leading-[22px]">{t("blog.authorName")}</span>
                            <PostMeta post={post} withDate />
                        </div>
                    </div>
                    <Link href={postPath(post)} className="flex h-[45px] items-center rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90">
                        {t("blog.readMore")}
                    </Link>
                </div>
            </div>
            <Link href={postPath(post)} tabIndex={-1} aria-hidden className="order-first block overflow-hidden rounded-22 sm:order-none">
                <PostCover src={post.imageUrl} alt="" className="h-56 w-full sm:aspect-square sm:h-full" />
            </Link>
        </article>
    );
};
