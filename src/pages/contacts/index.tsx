"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactsPage() {
    const { t } = useTranslation('common');

    // Стейт для обробки форми
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Емуляція відправки форми
        if (formData.name && formData.email && formData.message) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 6000); // Сховати повідомлення про успіх через 6 секунд
        }
    };

    return (
        <main className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors duration-300 py-13 px-15 md:py-20">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* ВЕЛИКИЙ ЗАГОЛОВОК СТОРІНКИ */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient text-transparent bg-clip-text pb-1">
                        {t('contactsPage.title')}
                    </h1>
                    <p className="text-text-muted text-base md:text-lg leading-relaxed">
                        {t('contactsPage.subtitle')}
                    </p>
                </div>

                {/* ДВОКОЛОНКОВИЙ ЛЕЯУТ ДЛЯ ДЕСТКОПІВ */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* ЛІВА КОЛОНКА: ІНФОРМАЦІЙНІ КАРТКИ (Займає 2 частини з 5) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Картка Email */}
                        <div className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 md:p-6 border border-border shadow-input dark:shadow-input-dark transition-all duration-300 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl select-none">✉️</span>
                                <h2 className="font-bold text-lg md:text-xl">
                                    {t('contactsPage.emailCard.title')}
                                </h2>
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {t('contactsPage.emailCard.description')}
                            </p>
                            <a
                                href={`mailto:workzora.partners@gmail.com`}
                                className="block text-base md:text-lg font-bold text-success hover:underline break-all pt-1"
                            >
                                workzora.partners@gmail.com
                            </a>
                        </div>

                        {/* Картка Юридичної інформації */}
                        <div className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 md:p-6 border border-border shadow-input dark:shadow-input-dark transition-all duration-300 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl select-none">⚖️</span>
                                <h2 className="font-bold text-lg md:text-xl">
                                    {t('contactsPage.legalCard.title')}
                                </h2>
                            </div>
                            <p className="text-xs md:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                                {t('contactsPage.legalCard.text')}
                            </p>
                        </div>

                    </div>

                    {/* ПРАВА КОЛОНКА: ІНТЕРАКТИВНА ФОРМА ЗВОРOТНОГО ЗВ'ЯЗКУ (Займає 3 частини з 5) */}
                    <div className="lg:col-span-3 bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 md:p-8 border border-border shadow-input dark:shadow-input-dark transition-all duration-300">
                        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="select-none">✏️</span>
                            {t('contactsPage.form.title')}
                        </h2>

                        {isSubmitted ? (
                            /* Повідомлення про успішну відправку */
                            <div className="bg-bg dark:bg-bg-dark border border-success/30 rounded-20 p-6 text-center space-y-3 animate-fade-in">
                                <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center text-xl mx-auto shadow-input">
                                    ✓
                                </div>
                                <p className="text-sm md:text-base font-medium text-success">
                                    {t('contactsPage.form.successMessage')}
                                </p>
                            </div>
                        ) : (
                            /* Сама форма */
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Поле: Ім'я */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-text dark:text-text-dark">
                                        {t('contactsPage.form.nameLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={t('contactsPage.form.namePlaceholder')}
                                        className="w-full px-15 py-13 rounded-20 text-sm bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border focus:outline-none focus:ring-1 focus:ring-success transition-all duration-300"
                                    />
                                </div>

                                {/* Поле: Email */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-text dark:text-text-dark">
                                        {t('contactsPage.form.emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder={t('contactsPage.form.emailPlaceholder')}
                                        className="w-full px-15 py-13 rounded-20 text-sm bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border focus:outline-none focus:ring-1 focus:ring-success transition-all duration-300"
                                    />
                                </div>

                                {/* Поле: Повідомлення */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-text dark:text-text-dark">
                                        {t('contactsPage.form.messageLabel')}
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={t('contactsPage.form.messagePlaceholder')}
                                        className="w-full px-15 py-13 rounded-20 text-sm bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border focus:outline-none focus:ring-1 focus:ring-success transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Кнопка сабміту з фірмовим градієнтом */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient text-white font-semibold px-15 py-13 rounded-20 shadow-input hover:opacity-90 transition-opacity duration-200 text-sm md:text-base"
                                    >
                                        {t('contactsPage.form.submitBtn')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </main>
    );
}