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
        <article className="flex flex-col overflow-hidden rounded-[24px] bg-main-5">
            <Link href={postPath(post)} tabIndex={-1} aria-hidden className="relative block">
                <PostCover src={post.imageUrl} alt="" className="aspect-[317/225] w-full" />
                <span className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-1.5 text-xs text-white backdrop-blur-md">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">
                        <WorkzoraMarkIcon w={16} h={16} />
                    </span>
                    <span className="truncate">
                        <span className="opacity-70">{t("blog.author")}</span> {t("blog.authorName")}
                    </span>
                </span>
            </Link>
            <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-center justify-between gap-2 text-xs">
                    {tagKey ? <span className="text-primary">#{t(`blog.categories.${tagKey}`)}</span> : <span />}
                    <span className="text-main-50">{formatPostDate(post.createdAt, i18n.language)}</span>
                </div>
                <h3 className="line-clamp-2 break-words text-base font-semibold leading-snug">
                    <Link href={postPath(post)} className="hover:text-primary">
                        {post.title}
                    </Link>
                </h3>
                <PostMeta post={post} />
                <div className="line-clamp-3 break-words text-xs leading-5" dangerouslySetInnerHTML={{ __html: post.teaser }} />
                <Link href={postPath(post)} className="mt-auto w-fit rounded-full bg-gradient px-5 py-2.5 text-xs text-white transition-opacity hover:opacity-90">
                    {t("blog.readMore")}
                </Link>
            </div>
        </article>
    );
};
