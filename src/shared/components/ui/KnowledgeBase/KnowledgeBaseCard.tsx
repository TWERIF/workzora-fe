import Link from "next/link";
import { ArrowIcon } from "../../svg/Knowledgebase/ArrowIcon";

interface KnowledgeBaseCardProps {
    title: string;
    description: string;
    link: string;
}

export default function KnowledgeBaseCard({ title, description, link }: KnowledgeBaseCardProps) {
    return (
        <Link href={link} className="bg-bg dark:bg-bg-modalDark rounded-20 p-[24px] md:p-[28px] transition-colors duration-300">
            <div className="flex items-start justify-between gap-[12px]">
                <h3 className="text-text dark:text-text-dark font-semibold text-[16px] md:text-[18px]">
                    {title}
                </h3>
                <ArrowIcon />
            </div>
            <p className="mt-[10px] text-text-light dark:text-text-muted text-[13px] md:text-[14px] leading-[1.5]">
                {description}
            </p>
        </Link>
    );
}