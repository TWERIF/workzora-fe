import { useCategoriesList } from "@/features/categories/model/useData";
import { BgNetwork } from "@/shared/components/svg/BgDecor";
import IconSearch from "@/shared/components/svg/IconSearch";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function LookingFor() {
    const { t } = useTranslation("main");
    const router = useRouter();
    const locale = router.locale || "en";

    const { data } = useCategoriesList({
        page: 1,
        limit: 6,
    });

    const categories = data?.items ?? [];

    const toSearch = () => router.push(`/${locale}/categories`);

    return (
        <div className="relative bg-white dark:bg-bg-dark text-[#333333] rounded-t-[40px] md:rounded-t-[60px] pt-14 pb-16 mt-4">
            <BgNetwork className="opacity-100" />

            <div className="relative container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                    {t("hero.search.title")}
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toSearch();
                    }}
                    className="bg-white dark:bg-bg-dark max-w-3xl mx-auto flex items-center gap-2 rounded-[100px] px-5 py-3 cursor-pointer border-[1px] dark:border-[#444444] border-[#E2E2E2]"
                >
                    <IconSearch color="#7EA310" className="w-5 h-5 opacity-50 shrink-0" />

                    <input
                        readOnly
                        onClick={toSearch}
                        placeholder={t("hero.search.placeholder") as string}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-text-muted cursor-pointer"
                    />

                    <ButtonGradient
                        text={t("hero.search.button")}
                        type="submit"
                    />
                </form>

                <div className="mt-8 flex flex-col items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-text-muted">
                        {t("hero.search.popularLabel")}
                    </span>

                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={toSearch}
                                className="text-xs md:text-sm rounded-full border border-border px-4 py-2 hover:bg-bg transition-colors dark:text-text-dark dark:hover:text-text"
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}