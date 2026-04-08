import { useState } from "react";
import { FAQItem } from "../FAQitem";
import { useTranslation } from "react-i18next";

export const FAQSection = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    const { t } = useTranslation("common");

    const toggleItem = (i: number) => setOpenId(openId === i ? null : i);
    const faqData = t("faq", { returnObjects: true });

    // Розділяємо дані на парні та непарні, щоб вони не залежали одне від одного
    const leftCol = [0, 2, 4, 6];
    const rightCol = [1, 3, 5, 7];

    return (
        <section className="bg-success py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 uppercase">
                    <span className="text-black px-2 py-1 mr-2">{faqData.title.part_1}</span>
                    <span className="text-white">{faqData.title.part_2}</span>
                </h2>

                {/* Використовуємо flex зі ставками на стабільність колонки */}
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Ліва колонка */}
                    <div className="flex-1 space-y-6 w-full">
                        {leftCol.map((i) => (
                            <FAQItem
                                key={i}
                                isOpen={openId === i}
                                handleToggle={() => toggleItem(i)}
                                question={faqData.content.at(0).question}
                                answer={faqData.content.at(0).answer}
                            />
                        ))}
                    </div>

                    {/* Права колонка */}
                    <div className="flex-1 space-y-6 w-full">
                        {rightCol.map((i) => (
                            <FAQItem
                                key={i}
                                isOpen={openId === i}
                                handleToggle={() => toggleItem(i)}
                                question={faqData.content.at(0).question}
                                answer={faqData.content.at(0).answer}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};