"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function PaymentsHistoryPage() {
    const { t } = useTranslation('common');
    const [activeFilter, setActiveFilter] = useState('all');
    const isInflow = (type: string) => ['deposit', 'escrow_release'].includes(type);


    return (
        <main className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors duration-300 py-13 px-15 md:py-20">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient text-transparent bg-clip-text pb-1">
                        {t('paymentsHistory.title')}
                    </h1>
                    <p className="text-text-muted text-sm md:text-base mt-1">
                        {t('paymentsHistory.subtitle')}
                    </p>
                </div>


                <div className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-16 text-center border border-border shadow-input dark:shadow-input-dark max-w-2xl mx-auto space-y-6 my-8">
                    <div className="w-16 h-16 bg-bg dark:bg-bg-dark rounded-full flex items-center justify-center mx-auto border border-border text-3xl shadow-input select-none">
                        💵
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-text dark:text-text-dark">
                            {t('paymentsHistory.emptyState.title')}
                        </h2>
                        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                            {t('paymentsHistory.emptyState.description')}
                        </p>
                    </div>
                    <button className="bg-gradient text-white font-semibold px-6 py-3 rounded-20 shadow-input hover:opacity-90 transition-opacity duration-200">
                        {t('paymentsHistory.emptyState.actionButton')}
                    </button>
                </div>

            </div>
        </main>
    );
}