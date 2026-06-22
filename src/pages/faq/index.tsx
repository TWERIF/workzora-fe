"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Налаштування іконок для кожної категорії відповідно до документа
const CATEGORIES = [
    { key: 'general', icon: 'ℹ️' },
    { key: 'gettingStarted', icon: '🚀' },
    { key: 'escrow', icon: '🔒' },
    { key: 'payments', icon: '💵' },
    { key: 'disputes', icon: '⚖️' },
    { key: 'account', icon: '👤' },
    { key: 'about', icon: '⚙️' }
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-border bg-bg-header dark:bg-bg-modalDark rounded-20 overflow-hidden transition-colors duration-300 shadow-input dark:shadow-input-dark">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left px-15 py-13 md:p-6 focus:outline-none"
            >
                <span className="font-semibold text-text dark:text-text-dark text-base md:text-lg pr-4">
                    {question}
                </span>
                <span
                    className={`text-success transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-15 pb-13 md:px-6 md:pb-6 text-text-muted whitespace-pre-line leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const { t } = useTranslation('common');

    return (
        <main className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors duration-300 py-13 px-15 md:py-20">
            <div className="max-w-3xl mx-auto space-y-12">

                {/* HEADER SECTION */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient text-transparent bg-clip-text pb-1">
                        {t('faqPage.title')}
                    </h1>
                    <p className="text-lg font-medium text-text dark:text-text-dark">
                        {t('faqPage.subtitle')}
                    </p>
                    <p className="text-text-muted">
                        {t('faqPage.description')}
                    </p>
                    <div className="inline-block px-4 py-2 mt-4 bg-bg-header dark:bg-bg-modalDark border border-border rounded-20 shadow-input dark:shadow-input-dark text-sm font-medium text-text-muted">
                        {t('faqPage.stats')}
                    </div>
                </div>

                {/* FAQ CATEGORIES */}
                <div className="space-y-10">
                    {CATEGORIES.map((cat) => {
                        // Отримуємо масив питань для поточної категорії
                        const items = t(`faqPage.categories.${cat.key}.items`, { returnObjects: true });

                        // Якщо масив порожній (наприклад, для 'account' або 'about' у поточному JSON), не рендеримо блок
                        if (!Array.isArray(items) || items.length === 0) return null;

                        return (
                            <section key={cat.key} className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-text dark:text-text-dark pl-2">
                                    <span className="select-none">{cat.icon}</span>
                                    {t(`faqPage.categories.${cat.key}.title`)}
                                </h2>
                                <div className="space-y-3">
                                    {items.map((item, idx) => (
                                        <FaqItem
                                            key={idx}
                                            question={item.question}
                                            answer={item.answer}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* CONTACT & LEGAL BLOCK */}
                <section className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 md:p-8 shadow-input dark:shadow-input-dark border border-border text-center mt-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-text dark:text-text-dark pb-1">
                        {t('faqPage.contactBlock.title')}
                    </h2>
                    <p className="mb-6 text-text-muted leading-relaxed">
                        {t('faqPage.contactBlock.subtitle')}
                    </p>

                    <a
                        href={`mailto:${t('faqPage.contactBlock.email')}`}
                        className="inline-block bg-gradient text-white font-semibold px-8 py-3 rounded-20 shadow-input hover:opacity-90 transition-opacity duration-200"
                    >
                        {t('faqPage.contactBlock.email')}
                    </a>

                    <div className="mt-8 pt-6 border-t border-border text-left text-xs text-text-muted leading-relaxed">
                        {t('faqPage.contactBlock.legal')}
                    </div>
                </section>

            </div>
        </main>
    );
}