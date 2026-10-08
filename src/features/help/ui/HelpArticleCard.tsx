import { ArrowIcon } from "@/shared/components/svg/Knowledgebase/ArrowIcon";
import Link from "next/link";
import { helpArticlePath, type HelpArticleSummary } from "../model/types";

export default function HelpArticleCard({ article, label }: { article: HelpArticleSummary; label?: string }) {
    return (
        <Link href={helpArticlePath(article)} className="group flex h-full flex-col gap-2 rounded-[24px] bg-main-5 p-6 transition-colors hover:bg-primary-10">
            {label && <span className="text-xs text-primary">{label}</span>}
            <span className="flex items-start justify-between gap-3">
                <span className="break-words text-xl font-medium leading-[26px] group-hover:text-primary">{article.title}</span>
                <span className="mt-1 shrink-0 text-primary">
                    <ArrowIcon />
                </span>
            </span>
            {article.summary && <span className="break-words text-sm leading-[21px] text-main-50">{article.summary}</span>}
        </Link>
    );
}
