import CategoriesList from "@/features/categories/ui/CategoriesList";
import CategoryAccordion from "@/features/categories/ui/CategoryAccordion";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import CategoriesHero from "@/shared/components/ui/Hero/CategoriesHero";
import PostsList from "@/shared/components/ui/Post/Post";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Categories() {
    const router = useRouter();
    const locale = router.locale || "en";
    const { t } = useTranslation("common");

    return (
        <>
            <div className="bg-bg dark:bg-bg-dark shadow-[inset_0_5px_10px_-3px_rgba(99,102,241,0.3)] transition-colors duration-200">
                <CategoriesHero t={t} locale={locale} />
                <div className="px-16 py-16" >
                    <Breadcrumbs />
                    <CategoriesList t={t} />
                </div>
            </div>
            
            <div className="bg-bg-header dark:bg-bg-modalDark shadow-2xl px-16 py-16 transition-colors duration-200">
                <h1 className="font-bold text-[3.438rem] text-text dark:text-text-dark leading-none">
                    {t("categories.browseAll")} <br /> 
                    <span className="text-success font-bold text-[3.438rem]">{t("categories.categories")}</span>
                </h1>
                <CategoryAccordion />
            </div>
            
            <div className="bg-bg dark:bg-bg-dark shadow-[inset_0_5px_10px_-3px_rgba(99,102,241,0.3)] px-16 py-16 transition-colors duration-200">
                <h1 className="font-bold text-[3.438rem] text-text dark:text-text-dark leading-none">
                    {t("categories.recommendedArticles")} <br /> 
                    <span className="text-success font-bold text-[3.438rem]">{t("categories.jfu")}</span>
                </h1>
                <PostsList t={t} />
            </div>
        </>
    );
}