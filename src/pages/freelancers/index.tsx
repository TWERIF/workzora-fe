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
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-24 text-main-100 sm:px-8">
            <PageMeta page="freelancers" />
            <Breadcrumbs />

            <div className="mb-6 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold leading-[55px] md:text-[40px]">{t("title")}</h1>
                <span className="text-xl font-semibold text-primary">({data?.total ?? 0})</span>
            </div>

            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-start lg:gap-[31px]">
                <aside className="h-fit w-full shrink-0 rounded-22 border border-main-10 p-6 lg:w-[317px]">
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

                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <form onSubmit={submit} role="search" className="flex w-full items-center gap-3 rounded-full border border-main-10 bg-background py-2 pl-6 pr-2 focus-within:border-primary">
                        <label className="flex min-w-0 flex-1 items-center gap-3">
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
                                className="h-[38px] min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-main-50"
                            />
                        </label>
                        <button type="submit" className="shrink-0 rounded-full bg-gradient px-6 py-3 text-sm text-white transition-opacity hover:opacity-90">
                            {t("search.button")}
                        </button>
                    </form>

                    <div className={`flex flex-col gap-3 transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
                        {isLoading
                            ? Array.from({ length: 3 }, (_, index) => <div key={index} className="h-[200px] animate-pulse rounded-36 bg-main-5" />)
                            : freelancers.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} />)}
                        {!isLoading && freelancers.length === 0 && <p className="py-10 text-center text-main-50">{t("empty")}</p>}
                    </div>

                    <Pagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
}
