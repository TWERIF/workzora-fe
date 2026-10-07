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
                <h3 className="text-base font-semibold leading-[29px] text-text dark:text-text-dark">{item.title}</h3>
                <p className="line-clamp-4 text-sm text-text dark:text-text-dark">{item.description}</p>
            </div>
        </article>
    );
};
