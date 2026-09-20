import { useCategoriesList } from "@/features/categories/model/useData";
import FreelancerCard from "@/features/freelancers/ui/FreelancerCard";
import { useUsers } from "@/features/main/model/useUsers";

import CloseIcon from "@/shared/components/svg/CloseIcon";
import IconArrow from "@/shared/components/svg/IconArrow";
import SearchIcon from "@/shared/components/svg/SearchIcon";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 6;

interface Specialization {
  id: string;
  name: string;
  freelancersCount?: number;
}

interface Category {
  id: string;
  name: string;
  freelancersCount?: number;
  specializations?: Specialization[];
}

// Loosely typed raw item coming from the API/hook, before normalization.
type RawCategory = Record<string, any>;

function normalizeSpecialization(raw: RawCategory): Specialization {
  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "",
    freelancersCount:
      raw.freelancersCount ?? raw.freelancerCount ?? raw.count ?? undefined,
  };
}

function normalizeCategory(raw: RawCategory): Category {
  const rawSpecializations: RawCategory[] =
    raw.specializations ?? raw.subcategories ?? [];

  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "",
    freelancersCount:
      raw.freelancersCount ?? raw.freelancerCount ?? raw.count ?? undefined,
    specializations: rawSpecializations.map(normalizeSpecialization),
  };
}

export default function TopFreelancers() {
  const { t } = useTranslation("topFreelancers");
  const { topFreelancers } = useUsers();
  const { data: categoriesData } = useCategoriesList();

  const rawCategories: RawCategory[] = Array.isArray(categoriesData)
    ? categoriesData
    : ((categoriesData as { items?: RawCategory[] } | undefined)?.items ?? []);

  const categories: Category[] = useMemo(
    () => rawCategories.map(normalizeCategory),
    [rawCategories],
  );

  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<
    string | null
  >(null);
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);
  const [page, setPage] = useState(1);

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const specializations = selectedCategory?.specializations ?? [];

  const visibleSpecializations = showAllSpecializations
    ? specializations
    : specializations.slice(0, 5);

  const selectedSpecialization = useMemo(
    () =>
      specializations.find((s) => s.id === selectedSpecializationId) ?? null,
    [specializations, selectedSpecializationId],
  );

  const activeChips = [
    selectedCategory && { id: selectedCategory.id, name: selectedCategory.name, type: "category" as const },
    selectedSpecialization && {
      id: selectedSpecialization.id,
      name: selectedSpecialization.name,
      type: "specialization" as const,
    },
  ].filter(Boolean) as { id: string; name: string; type: "category" | "specialization" }[];

  const filtered = useMemo(() => {
    const list = topFreelancers ?? [];
    if (!search.trim()) return list;
    const query = search.trim().toLowerCase();
    return list.filter((f) => {
      const fullName = f.name || `${f.firstName} ${f.lastName}`;
      return fullName.toLowerCase().includes(query);
    });
  }, [topFreelancers, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    setSelectedSpecializationId(null);
    setShowAllSpecializations(false);
    setPage(1);
  };

  const handleSelectSpecialization = (specializationId: string) => {
    setSelectedSpecializationId((prev) =>
      prev === specializationId ? null : specializationId,
    );
    setPage(1);
  };

  const clearFilter = (type: "category" | "specialization") => {
    if (type === "category") {
      setSelectedCategoryId(null);
      setSelectedSpecializationId(null);
    } else {
      setSelectedSpecializationId(null);
    }
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setSelectedSpecializationId(null);
    setPage(1);
  };

  return (
    <div className="bg-[#ffffff] text-text dark:bg-bg-dark dark:text-text-dark transition-colors py-20 duration-300 min-h-screen px-20">
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs />
      </div>

      <div className="container mx-auto px-4 pt-4 pb-4 flex items-center justify-between">
        <h1 className="text-3xl md:text-[40px] font-bold">{t("title")}</h1>
        <span className="text-success font-bold text-lg">
          ({topFreelancers?.length ?? 0})
        </span>
      </div>

      <div className="container mx-auto px-4 pb-16 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="rounded-2xl bg-bg-header dark:bg-bg-modalDark shadow-card dark:shadow-card-dark p-5 flex flex-col gap-5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold">{t("filters.title")}</span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-error hover:underline"
              >
                {t("filters.clearAll")}
              </button>
            </div>

            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeChips.map((chip) => (
                  <span
                    key={`${chip.type}-${chip.id}`}
                    className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm"
                  >
                    {chip.name}
                    <button
                      type="button"
                      onClick={() => clearFilter(chip.type)}
                      aria-label="remove filter"
                    >
                      <CloseIcon />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <span className="font-bold">{t("filters.category")}</span>
              {categories.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center justify-between gap-2 cursor-pointer text-sm"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategoryId === c.id}
                      onChange={() => handleSelectCategory(c.id)}
                      className="accent-success w-4 h-4"
                    />
                    {c.name}
                  </span>
                  {typeof c.freelancersCount === "number" && (
                    <span className="text-success">
                      ({c.freelancersCount})
                    </span>
                  )}
                </label>
              ))}
            </div>

            {selectedCategory && specializations.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="font-bold">
                  {t("filters.specialization")}
                </span>
                {visibleSpecializations.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="radio"
                      name="specialization"
                      checked={selectedSpecializationId === s.id}
                      onChange={() => handleSelectSpecialization(s.id)}
                      className="accent-success w-4 h-4"
                    />
                    {s.name}
                  </label>
                ))}
                {specializations.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSpecializations((v) => !v)}
                    className="text-success text-sm text-left"
                  >
                    {showAllSpecializations
                      ? t("filters.showLess")
                      : t("filters.showMore")}{" "}
                    ⌄
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 rounded-2xl bg-input dark:bg-input-dark shadow-input dark:shadow-input-dark px-4 py-3 transition-colors">
              <SearchIcon />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={t("search.placeholder")}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-text-light dark:placeholder:text-text-muted"
              />
            </div>
            <button
              type="button"
              className="bg-gradient text-white font-bold rounded-2xl px-6 py-3 shrink-0"
            >
              {t("search.button")}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {paginated.length > 0 ? (
              paginated.map((freelancer) => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))
            ) : (
              <p className="text-text-light dark:text-text-muted py-10 text-center">
                {t("empty")}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mx-auto mt-4 flex items-center gap-3">
              <button
                type="button"
                aria-label={t("pagination.prev")}
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center disabled:opacity-40 rotate-180"
              >
                <IconArrow />
              </button>

              {pageNumbers.map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-1">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${p === currentPage
                        ? "border border-success text-success"
                        : "text-text dark:text-text-dark"
                      }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                type="button"
                aria-label={t("pagination.next")}
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-full bg-success flex items-center justify-center disabled:opacity-40"
              >
                <IconArrow color="#ffffff" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}