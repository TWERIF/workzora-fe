import { PortfolioItem } from "@/features/portfolio/model/types";
import { IconEye, IconImage } from "@/shared/components/svg/UiIcons";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

interface PortfolioCardProps {
    item: PortfolioItem;
    actions?: ReactNode;
    onOpen?: (item: PortfolioItem) => void;
}

const formatDate = (value: string) => {
    const date = new Date(value);
    const pad = (part: number) => String(part).padStart(2, "0");
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const PortfolioCard = ({ item, actions, onOpen }: PortfolioCardProps) => {
    const { locale = "en" } = useRouter();
    const date = item.createdAt ? formatDate(item.createdAt) : null;
    const cover = item.imageUrl ? (
        <img src={item.imageUrl} alt={item.title} loading="lazy" className="aspect-[322/238] w-full rounded-[24px] object-cover object-top" />
    ) : (
        <div className="flex aspect-[322/238] w-full items-center justify-center rounded-[24px] bg-main-10 text-main-50">
            <IconImage size={40} />
        </div>
    );

    return (
        <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-main-5">
            {onOpen ? (
                <button type="button" onClick={() => onOpen(item)} className="block text-left" aria-label={item.title}>
                    {cover}
                </button>
            ) : (
                cover
            )}
            {actions && <div className="absolute right-3 top-3 flex gap-2">{actions}</div>}
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                {(item.views !== undefined || date) && (
                    <div className="flex items-center justify-between gap-2 text-sm text-main-50">
                        <span className="flex items-center gap-1.5">
                            <IconEye size={18} className="text-primary" />
                            {(item.views ?? 0).toLocaleString(locale === "uk" ? "uk-UA" : "en-US")}
                        </span>
                        {date && <time dateTime={item.createdAt}>{date}</time>}
                    </div>
                )}
                <h3 className="break-words text-base font-semibold leading-[29px]">{item.title}</h3>
                {item.tags && item.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <li key={tag} className="rounded-full bg-background px-3 py-1 text-xs text-primary">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                )}
                {item.description && <p className="line-clamp-4 break-words text-sm leading-6">{item.description}</p>}
            </div>
        </article>
    );
};
