import { PortfolioItem } from "@/features/portfolio/model/types";
import UploadIcon from "@/shared/components/svg/Profile/UploadIcon";
import ButtonPill from "@/shared/components/ui/Button/ButtonPill";
import { useTranslation } from "react-i18next";
import { Pagination } from "./Pagination";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioSectionProps {
    items?: PortfolioItem[];
    page?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
    onAddProject?: () => void;
    onOpen?: (item: PortfolioItem) => void;
}

export const PortfolioSection = ({
    items = [],
    page = 1,
    pageCount = 1,
    onPageChange,
    onAddProject,
    onOpen,
}: PortfolioSectionProps) => {
    const { t } = useTranslation("common");

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-25 font-bold text-text dark:text-text-dark">
                {t("profile.portfolio.title")}
            </h2>

            {items.length === 0 && !onAddProject ? (
                <p className="rounded-3xl bg-surface px-6 py-3 text-sm text-text-light dark:bg-bg-modalDark">
                    {t("profile.noData.portfolio")}
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {onAddProject && (
                            <div className="flex min-h-[483px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-text-light px-6 text-center">
                                <div className="flex flex-col gap-[6px] text-text dark:text-text-dark">
                                    <p className="text-base font-semibold">{t("profile.portfolio.addTitle")}</p>
                                    <p className="text-sm">{t("profile.portfolio.addDescription")}</p>
                                </div>
                                <ButtonPill
                                    onClick={onAddProject}
                                    icon={<UploadIcon />}
                                    text={t("profile.portfolio.addAction")}
                                />
                            </div>
                        )}
                        {items.map((item) => (
                            <PortfolioCard key={item.id} item={item} onOpen={onOpen} />
                        ))}
                    </div>
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                </>
            )}
        </section>
    );
};
