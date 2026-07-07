import { useTranslation } from "react-i18next";
import { EyeIcon } from "./icons";

export interface PortfolioItem {
    id: string;
    imageUrl: string;
    title: string;
    tags: string[];
    description: string;
    views: number;
    date: string;
}

interface PortfolioCardProps {
    item: PortfolioItem;
}

export const PortfolioCard = ({ item }: PortfolioCardProps) => {
    const { t } = useTranslation("common");

    return (
        <article className="overflow-hidden rounded-20 border border-border bg-bg-header dark:bg-bg-modalDark">
            <img src={item.imageUrl} alt={item.title} className="h-40 w-full object-cover" />
            <div className="px-15 py-13">
                <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                        <EyeIcon className="h-3.5 w-3.5" />
                        {t("profile.portfolio.views", { count: item.views })}
                    </span>
                    <span>{item.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-medium text-text dark:text-text-dark">{item.title}</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span key={tag} className="text-xs text-success">
                            #{tag}
                        </span>
                    ))}
                </div>
                <p className="mt-2 line-clamp-3 text-xs text-text-muted">{item.description}</p>
            </div>
        </article>
    );
};