import CategoryTreeFilter, { selectionChips, type CategorySelection } from "@/features/categories/ui/CategoryTreeFilter";
import FilterChip from "@/features/categories/ui/FilterChip";
import { useFreelancerCategories, useFreelancers } from "@/features/freelancers/model/useFreelancers";
import FreelancerCard from "@/features/freelancers/ui/FreelancerCard";
import PageMeta from "@/shared/components/seo/PageMeta";
import { IconSearch } from "@/shared/components/svg/UiIcons";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Pagination from "@/shared/components/ui/Pagination";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

const LIMIT = 6;
const EMPTY: CategorySelection = { category: null, specializations: [] };

export default function TopFreelancers() {
    const { t } = useTranslation("topFreelancers");
    const [draft, setDraft] = useState("");
    const [search, setSearch] = useState("");
    const [selection, setSelection] = useState<CategorySelection>(EMPTY);
    const [page, setPage] = useState(1);

    const { data: tree = [] } = useFreelancerCategories();
    const { data, isLoading, isFetching } = useFreelancers({ page, limit: LIMIT, search, ...selection });
    const freelancers = data?.data ?? [];
    const chips = selectionChips(tree, selection);

    const select = (next: CategorySelection) => {
        setSelection(next);
        setPage(1);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        setSearch(draft);
        setPage(1);
    };

    return (
        <div className="mx-auto w-full max-w-[1360px] px-4 pb-20 pt-28 text-main-100 lg:pt-[140px]">
            <PageMeta page="freelancers" />
            <Breadcrumbs />

            <div className="mb-6 mt-5 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold sm:text-[40px] sm:leading-tight">{t("title")}</h1>
                <span className="text-lg font-semibold text-primary">({data?.total ?? 0})</span>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <aside className="h-fit w-full shrink-0 rounded-20 border border-main-10 bg-background p-4 lg:w-[272px]">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold">{t("filters.title")}</h2>
                        {chips.length > 0 && (
                            <button type="button" onClick={() => select(EMPTY)} className="border-b border-dashed border-status-danger text-[11px] text-status-danger">
                                {t("filters.clearAll")}
                            </button>
                        )}
                    </div>
                    {chips.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {chips.map((chip) => (
                                <FilterChip key={chip.id} label={chip.label} onRemove={() => select(chip.next)} />
                            ))}
                        </div>
                    )}
                    <CategoryTreeFilter tree={tree} {...selection} onChange={select} />
                </aside>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <form onSubmit={submit} role="search" className="flex gap-2.5">
                        <label className="flex h-[50px] min-w-0 flex-1 items-center gap-2 rounded-20 border border-main-10 bg-background px-4 focus-within:border-primary">
                            <IconSearch size={18} className="shrink-0 text-primary" />
                            <input
                                type="search"
                                value={draft}
                                onChange={(event) => {
                                    setDraft(event.target.value);
                                    if (!event.target.value) {
                                        setSearch("");
                                        setPage(1);
                                    }
                                }}
                                placeholder={t("search.placeholder")}
                                aria-label={t("search.placeholder")}
                                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                            />
                        </label>
                        <button type="submit" className="h-[50px] shrink-0 rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90 sm:px-10">
                            {t("search.button")}
                        </button>
                    </form>

                    <div className={`flex flex-col gap-4 transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
                        {isLoading
                            ? Array.from({ length: 3 }, (_, index) => <div key={index} className="h-[180px] animate-pulse rounded-[24px] bg-main-5" />)
                            : freelancers.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} />)}
                        {!isLoading && freelancers.length === 0 && <p className="py-10 text-center text-main-50">{t("empty")}</p>}
                    </div>

                    <Pagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
}
