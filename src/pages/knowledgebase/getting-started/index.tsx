import IconSearch from "@/shared/components/svg/IconSearch";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import KnowledgeBaseCard from "@/shared/components/ui/KnowledgeBase/KnowledgeBaseCard";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface CardT {
    title: string;
    description: string;
    link: string;
}

export default function GettingStarted() {
    const { t } = useTranslation("getting-started");
    const router = useRouter();
    const locale = router.locale || "en";

    const cards = t("cards", { returnObjects: true }) as CardT[];
    const popularSearches = t("popularSearches.items", { returnObjects: true }) as string[];

    return (
        <section className="bg-white dark:bg-bg-dark transition-colors duration-300 py-28">
            <div className="max-w-[1200px] mx-auto px-[16px] md:px-[24px] ">
                <div className="flex flex-col items-center text-center">
                    <span className="inline-block bg-success text-text-dark text-[13px] font-medium rounded-full px-[18px] py-[6px]">
                        {t("badge")}
                    </span>

                    <h1 className="mt-[24px] text-text dark:text-text-dark font-extrabold text-[36px] md:text-[52px] leading-tight">
                        {t("title")}
                    </h1>

                    <p className="mt-[16px] max-w-[560px] text-text-light dark:text-text-muted text-[15px] md:text-[16px]">
                        {t("subtitle")}
                    </p>

                    <div className="mt-[32px] w-full max-w-[640px] flex items-center bg-input dark:bg-input-dark rounded-full shadow-input dark:shadow-input-dark px-[8px] py-[8px] gap-[8px] border-border border">
                        <span className="pl-[14px] text-text-light dark:text-text-muted">
                            <IconSearch color="#7EA310" />
                        </span>
                        <input
                            type="text"
                            placeholder={t("search.placeholder") as string}
                            className="flex-1 bg-transparent outline-none text-text dark:text-text-dark placeholder:text-text-light dark:placeholder:text-text-muted text-[14px] md:text-[15px]"
                        />
                        <ButtonGradient text={t("search.button") as string} className="!px-[28px] !py-[12px] !rounded-full" />
                    </div>

                    <div className="mt-[20px] flex flex-wrap items-center justify-center gap-[8px] text-[14px]">
                        <span className="text-text-light dark:text-text-muted">{t("popularSearches.label")}</span>
                        {popularSearches.map((item, idx) => (
                            <a key={idx} href="#" className="text-success hover:underline">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-[56px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    {cards.map((card, idx) => (
                        <KnowledgeBaseCard key={idx} title={card.title} description={card.description} link={`/${locale}/knowledgebase/getting-started/${card.link}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale ?? "en", ["getting-started"])),
//         },
//     };
// };