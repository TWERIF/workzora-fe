import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGradient from '../Button/ButtonGradient';

const BankVerification = () => {
    const { t } = useTranslation("common");
    const [selectedBank, setSelectedBank] = useState('Payoneer');
    const banks = [
        { name: 'Wise', logo: 'https://placehold.co/100x40/transparent/000?text=WISE' },
        { name: 'Payoneer', logo: 'https://placehold.co/100x40/transparent/000?text=Payoneer' },
        { name: 'American Express', logo: 'https://placehold.co/100x40/transparent/000?text=AMEX' },
        { name: 'Приват24', logo: 'https://placehold.co/100x40/transparent/000?text=Privat24' },
        { name: 'monobank', logo: 'https://placehold.co/100x40/transparent/000?text=monobank' },
        { name: 'KredoBank', logo: 'https://placehold.co/100x40/transparent/000?text=KredoBank' },
    ];
    return (
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#1A1A1A] rounded-[40px] p-10 shadow-sm font-sans text-[#333] dark:text-white">
            <h1 className="text-3xl font-bold mb-8">{t('profilePage.bank.title')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium px-2">{t('profilePage.bank.test_payment_title')}</h3>
                        <ButtonGradient text={t('profilePage.bank.test_payment_btn')} onClick={() => { }} />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-medium px-2">{t('profilePage.bank.use_api_title')}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {banks.map((bank) => (
                                <div
                                    key={bank.name}
                                    onClick={() => setSelectedBank(bank.name)}
                                    className={`relative flex flex-col items-center justify-center p-6 h-32 border-[1.5px] rounded-[25px] cursor-pointer transition-all ${selectedBank === bank.name
                                        ? 'border-lime-500 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {/* Радіо-кнопка вгорі */}
                                    <div className="absolute top-3 flex justify-center">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedBank === bank.name ? 'border-lime-500' : 'border-gray-200'
                                            }`}>
                                            {selectedBank === bank.name && (
                                                <div className="w-3 h-3 bg-lime-500 rounded-full" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Логотип (Placeholder) */}
                                    <div className="mt-6 flex items-center justify-center w-full">
                                        <img src={bank.logo} alt={bank.name} className="max-h-8 object-contain grayscale opacity-80" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-20 pt-2">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t('profilePage.bank.info_text_short')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {t('profilePage.bank.info_text_long')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BankVerification;