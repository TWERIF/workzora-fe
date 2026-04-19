import { useState } from "react";
import { FAQItem } from "./FAQitem";
import { useTranslation } from "react-i18next";

export const FAQSection = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    const { t } = useTranslation("common");

    const toggleItem = (i: number) => setOpenId(openId === i ? null : i);

    const faqData = t("faq", { returnObjects: true }) as {
        title: { part_1: string, part_2: string },
        content: { question: string, answer: string }[]
    };

    // Обмежуємо індекси реальною довжиною масиву, щоб уникнути undefined
    const contentCount = faqData?.content?.length || 0;
    const leftCol = [0, 2, 4, 6].filter(i => i < contentCount);
    const rightCol = [1, 3, 5, 7].filter(i => i < contentCount);

    if (!faqData || !faqData.content) return null;

    return (
        <section className="bg-success py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 uppercase">
                    {/* Виправлено на part_1 та part_2 відповідно до JSON */}
                    <span className="text-black px-2 py-1 mr-2">{faqData.title.part_1}</span>
                    <span className="text-white">{faqData.title.part_2}</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Ліва колонка */}
                    <div className="flex-1 space-y-6 w-full">
                        {leftCol.map((i) => {
                            const item = faqData.content[i];
                            return (
                                <FAQItem
                                    key={i}
                                    isOpen={openId === i}
                                    handleToggle={() => toggleItem(i)}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            );
                        })}
                    </div>

                    {/* Права колонка */}
                    <div className="flex-1 space-y-6 w-full">
                        {rightCol.map((i) => {
                            const item = faqData.content[i];
                            return (
                                <FAQItem
                                    key={i}
                                    isOpen={openId === i}
                                    handleToggle={() => toggleItem(i)}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};