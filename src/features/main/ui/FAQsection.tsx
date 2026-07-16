import { useState } from "react";
import { FAQItem } from "./FAQitem";
import { useTranslation } from "react-i18next";
import { Blocks } from "@/shared/components/svg/Blocks";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";

export const FAQSection = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const { t } = useTranslation("main");

    const toggleItem = (i: number) => setOpenId(openId === i ? null : i);

    const faqData = t("faq", { returnObjects: true }) as {
        title: { part_1: string; part_2: string };
        showAllBtn: string;
        content: { question: string; answer: string }[];
    };

    if (!faqData || !faqData.content) return null;

    const visibleItems = showAll ? faqData.content : faqData.content.slice(0, 4);

    return (
        <section id="faq" className="bg-bg dark:bg-bg-dark py-16 px-6 relative">
            <div className="absolute top-0 left-0 -z-1">
                <Blocks />
            </div>
            <div className="absolute bottom-0 right-0 -z-1 rotate-180">
                <Blocks />
            </div>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase text-center md:text-left">
                    <span className="dark:text-white text-text mr-2">{faqData.title.part_1}</span>
                    <span className="text-success">{faqData.title.part_2}</span>
                </h2>

                <div className="flex flex-col gap-4">
                    {visibleItems.map((item, i) => (
                        <FAQItem
                            key={i}
                            isOpen={openId === i}
                            handleToggle={() => toggleItem(i)}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>

                {!showAll && faqData.content.length > visibleItems.length && (
                    <div className="flex justify-center mt-8">
                        <ButtonGradient onClick={() => setShowAll(true)} text={faqData.showAllBtn} />
                    </div>
                )}
            </div>
        </section>
    );
};
