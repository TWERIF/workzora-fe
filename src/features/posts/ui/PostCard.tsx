import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import { formatPostDate } from "@/utils/formatPostDate";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { blogTagKey, Post, postPath } from "../model/types";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostMeta";

export const PostCard = ({ post }: { post: Post }) => {
    const { t, i18n } = useTranslation("common");
    const tagKey = blogTagKey(post.tag);

    return (
        <article className="flex flex-col overflow-hidden rounded-22 bg-main-5">
            <Link href={postPath(post)} tabIndex={-1} aria-hidden className="relative block overflow-hidden rounded-22">
                <PostCover src={post.imageUrl} alt="" className="aspect-[317/226] w-full" />
                <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <span className="absolute inset-x-4 bottom-4 flex h-[54px] items-center gap-3 rounded-20 border border-white/15 bg-white/5 px-2 text-sm text-white backdrop-blur-md">
                    <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white">
                        <WorkzoraMarkIcon w={26} h={26} />
                    </span>
                    <span className="truncate">
                        <span className="opacity-70">{t("blog.author")}</span> {t("blog.authorName")}
                    </span>
                </span>
            </Link>
            <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-6">
                <div className="flex items-center justify-between gap-2">
                    {tagKey ? <span className="text-xs text-primary">#{t(`blog.categories.${tagKey}`)}</span> : <span />}
                    <span className="text-[11px] font-medium text-main-50">{formatPostDate(post.createdAt, i18n.language)}</span>
                </div>
                <h3 className="line-clamp-2 break-words text-lg font-medium leading-[29px]">
                    <Link href={postPath(post)} className="hover:text-primary">
                        {post.title}
                    </Link>
                </h3>
                <PostMeta post={post} />
                <div className="line-clamp-3 break-words text-sm leading-[26px]" dangerouslySetInnerHTML={{ __html: post.teaser }} />
                <Link href={postPath(post)} className="mt-auto flex h-[45px] w-fit items-center rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90">
                    {t("blog.readMore")}
                </Link>
            </div>
        </article>
    );
};
