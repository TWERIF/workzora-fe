import { useCategoryTree } from "@/features/categories/model/useData";
import { useAllProjects } from "@/features/projects/model/useProjects";
import ProjectCard from "@/features/projects/ui/ProjectCard";
import ProjectFilters, { EMPTY_FILTERS, type ProjectFilterState } from "@/features/projects/ui/ProjectFilters";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Pagination from "@/shared/components/ui/Pagination";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageMeta from "@/shared/components/seo/PageMeta";


const LIMIT = 10;

export default function FindWorkPage() {
    const { t } = useTranslation("findWork");

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<ProjectFilterState>(EMPTY_FILTERS);
    const [page, setPage] = useState(1);

    const { data: tree = [] } = useCategoryTree();
    const categoryFilter = filters.specializations.length ? filters.specializations : filters.category ? [filters.category] : [];

    const { data, isLoading, isFetching } = useAllProjects({
        search,
        page,
        limit: LIMIT,
        categories: categoryFilter,
        tags: filters.tags,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    });

    useEffect(() => {
        setPage(1);
    }, [search, filters]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput.trim());
    };

    const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1;

    return (
        <div className="bg-bg dark:bg-bg-dark min-h-screen px-16 py-24 transition-colors duration-200">
            <PageMeta page="categories" />
            <Breadcrumbs />

            <div className="flex items-center justify-between mt-4">
                <h1 className="font-bold text-4xl text-text dark:text-text-dark">
                    {t("findWork.title")}
                </h1>
                <span className="font-bold text-xl text-success">
                    ({data?.total ?? 0})
                </span>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
                <ProjectFilters tree={tree} value={filters} onChange={setFilters} />

                <div className="flex-1 w-full">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 mb-6">
                        <div className="flex-1 flex items-center gap-2 rounded-full border border-border bg-input dark:bg-input-dark px-4 py-2.5">
                            <Search size={18} className="text-text-light dark:text-text-muted" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder={t("findWork.searchPlaceholder")}
                                className="w-full bg-transparent text-sm text-text dark:text-text-dark outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full bg-gradient text-white text-sm font-semibold hover:bg-gradientReverse transition-colors"
                        >
                            {t("findWork.searchButton")}
                        </button>
                    </form>

                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <p className="text-text-light dark:text-text-muted">
                                {t("findWork.loading")}
                            </p>
                        ) : data && data.data.length > 0 ? (
                            data.data.map((project) => (
                                <ProjectCard key={project.id} project={project} t={t} />
                            ))
                        ) : (
                            <p className="text-text-light dark:text-text-muted">
                                {t("findWork.noResults")}
                            </p>
                        )}
                    </div>

                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

                    {isFetching && !isLoading && (
                        <p className="text-center text-xs text-text-light dark:text-text-muted mt-3">
                            {t("findWork.updating")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}