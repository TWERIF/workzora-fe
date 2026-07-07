import { useTranslation } from "react-i18next";
import { Pagination } from "./Pagination";
import { PortfolioCard, PortfolioItem } from "./PortfolioCard";

interface PortfolioSectionProps {
    items?: PortfolioItem[];
    page?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
}

export const PortfolioSection = ({
    items = [],
    page = 1,
    pageCount = 1,
    onPageChange,
}: PortfolioSectionProps) => {
    const { t } = useTranslation("common");

    return (
        <section>
            <h2 className="text-base font-semibold text-text dark:text-text-dark">
                {t("profile.portfolio.title")}
            </h2>

            {items.length === 0 ? (
                <p className="mt-3 rounded-20 border border-border bg-bg-header px-15 py-13 text-sm text-text-muted dark:bg-bg-modalDark">
                    {t("profile.noData.portfolio")}
                </p>
            ) : (
                <>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <PortfolioCard key={item.id} item={item} />
                        ))}
                    </div>
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                </>
            )}
        </section>
    );
};