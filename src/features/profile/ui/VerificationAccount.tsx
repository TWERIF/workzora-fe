import IdIcon from '@/shared/components/svg/IdIcon';
import ImageIcon from '@/shared/components/svg/ImageIcon';
import ButtonGradient from '@/shared/components/ui/Button/ButtonGradientSmall';
import React from 'react';
import { useTranslation } from 'react-i18next';


const VerificationAccount = () => {
    const { t } = useTranslation("common");

    return (
        <div className="max-w-5xl mx-auto bg-[#F9F9F9] dark:bg-[#1A1A1A] rounded-[40px] p-12 shadow-sm font-sans text-[#333] dark:text-white">
            <h1 className="text-4xl font-bold mb-10">{t('profilePage.verification.title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            {t('profilePage.verification.passport_label')}
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder={t('profilePage.verification.select_file')}
                                    className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full py-4 px-6 pr-12"
                                    readOnly
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <ImageIcon />
                                </div>
                            </div>
                            <ButtonGradient text={t('profilePage.verification.upload_btn')} onClick={() => { }} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            {t('profilePage.verification.selfie_label')}
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder={t('profilePage.verification.select_file')}
                                    className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full py-4 px-6 pr-12"
                                    readOnly
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IdIcon />
                                </div>
                            </div>
                            <ButtonGradient text={t('profilePage.verification.make_photo_btn')} onClick={() => { }} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {t('profilePage.verification.info_text')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationAccount;