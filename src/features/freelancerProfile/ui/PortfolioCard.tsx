import { useTranslation } from "react-i18next";
import { EyeIcon } from "./icons";
import { PortfolioItem } from "@/features/portfolio/model/types";

interface PortfolioCardProps {
    item: PortfolioItem;
}

export const PortfolioCard = ({ item }: PortfolioCardProps) => {
    const { t } = useTranslation("common");

    return (
        <article className="flex flex-col overflow-hidden rounded-3xl bg-surface dark:bg-bg-modalDark">
            <img src={item.imageUrl} alt={item.title} className="h-[237.75px] w-full rounded-3xl object-cover" />
            <div className="flex flex-col gap-3 p-6">
                {/* <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-[6px] text-text dark:text-text-dark">
                        <EyeIcon className="size-[18px] text-success" />
                        {t("profile.portfolio.views", { count: item.views })}
                    </span>
                    <span className="text-text opacity-50 dark:text-text-dark">{item.date}</span>
                </div> */}
                <h3 className="text-base font-semibold leading-[29px] text-text dark:text-text-dark">{item.title}</h3>
                {/* <div className="flex flex-wrap gap-[6px]">
                    {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-bg-header px-3 py-[6px] text-xs text-success">
                            #{tag}
                        </span>
                    ))}
                </div> */}
                <p className="line-clamp-4 text-sm text-text dark:text-text-dark">{item.description}</p>
            </div>
        </article>
    );
};
