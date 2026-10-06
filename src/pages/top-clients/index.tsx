import { Pagination } from "@/features/freelancerProfile/ui/Pagination";
import type { RatingStars } from "@/features/topClients/model/types";
import { useTopClients } from "@/features/topClients/model/useTopClients";
import { ClientCard } from "@/features/topClients/ui/ClientCard";
import { ClientFilters } from "@/features/topClients/ui/ClientFilters";
import SearchRoundedIcon from "@/shared/components/svg/SearchRoundedIcon";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Loader from "@/shared/components/ui/Loader";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 8;

// Counterpart of /freelancers: clients ranked by the rating freelancers gave them in reviews.
export default function TopClients() {
    const { t } = useTranslation("topClients");

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [ratings, setRatings] = useState<RatingStars[]>([]);
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useTopClients({ page, limit: ITEMS_PER_PAGE, search, ratings });

    const toggleRating = (stars: RatingStars) => {
        setRatings((prev) =>
            prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars].sort((a, b) => b - a),
        );
        setPage(1);
    };

    const clearFilters = () => {
        setRatings([]);
        setSearch("");
        setSearchInput("");
        setPage(1);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-bg-header px-4 pb-24 pt-24 text-text transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark sm:px-8">
            <div className="mx-auto flex max-w-[1360px] flex-col gap-6">
                <div>
                    <Breadcrumbs />
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold leading-[55px] md:text-[40px]">{t("title")}</h1>
                        <span className="text-xl font-semibold text-success">({data?.total ?? 0})</span>
                    </div>
                </div>

                <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-[31px]">
                    <aside className="w-full shrink-0 lg:w-[317px]">
                        <ClientFilters
                            selected={ratings}
                            counts={data?.ratingCounts}
                            onToggle={toggleRating}
                            onClear={clearFilters}
                        />
                    </aside>

                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                        <form
                            onSubmit={handleSearch}
                            className="flex w-full items-center gap-3 rounded-full border border-border-light bg-bg-header py-2 pl-6 pr-2 dark:border-white/10 dark:bg-input-dark"
                        >
                            <SearchRoundedIcon className="shrink-0 text-success" />
                            <input
                                type="search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder={t("search.placeholder")}
                                aria-label={t("search.placeholder")}
                                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-text-light dark:placeholder:text-text-muted"
                            />
                            <ButtonGradient
                                type="submit"
                                text={t("search.button")}
                                className="shrink-0 !rounded-[100px] !px-6 !py-3"
                            />
                        </form>

                        {isLoading ? (
                            <Loader />
                        ) : isError ? (
                            <p className="py-10 text-center text-status-danger">{t("error")}</p>
                        ) : data && data.data.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {data.data.map((client) => (
                                    <ClientCard key={client.id} client={client} />
                                ))}
                            </div>
                        ) : (
                            <p className="py-10 text-center text-text-light dark:text-text-muted">{t("empty")}</p>
                        )}

                        <Pagination page={page} pageCount={data?.totalPages ?? 1} onPageChange={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
