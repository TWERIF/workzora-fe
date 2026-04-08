import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import IconInstagramSmall from '@/components/svg/IconInstagramSmall';
import IconFacebookSmall from '@/components/svg/IconFacebookSmall';
import IconTelegramSmall from '@/components/svg/IconTelegramSmall';
import IconYoutubeSmall from '@/components/svg/IconYoutubeSmall';
import AvalibleApplestoreIcon from '@/components/svg/AvalibleApplestoreIcon';
import AvalibleGoogleplayIcon from '@/components/svg/AvalibleGoogleplayIcon';
import Logo from '@/components/svg/Logo';
import LogoWhite from '@/components/svg/LogoWhite';
import LogoGreenStripes from '@/components/svg/LogoGreenStripes';

const icons = [
    IconFacebookSmall,
    IconInstagramSmall,
    IconTelegramSmall,
    IconYoutubeSmall
]
export default function Footer() {
    const { t } = useTranslation("common");

    // Отримуємо дані з JSON
    const footerData = t("footer", { returnObjects: true });
    const info = footerData.copyrightInfo;
    return (
        <>
            <footer className="bg-[rgba(51,51,51,1)] text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-64">

                        {/* ЛІВА ЧАСТИНА: Лого, Стори, Соцмережі */}
                        <div className="flex flex-col gap-10">
                            <div className="w-40">
                                <LogoGreenStripes />
                            </div>

                            <div className="flex  gap-4">
                                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                    <AvalibleApplestoreIcon />
                                </div>
                                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                                    <AvalibleGoogleplayIcon />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {icons.map((Icon, i) => (
                                    <div key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7EA310] transition-colors cursor-pointer">
                                        <Icon />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ПРАВА ЧАСТИНА: Списки посилань */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

                            {/* Колонка 1: Freelancer */}
                            <FooterColumn data={footerData.freelancer} />

                            {/* Колонка 2: About */}
                            <FooterColumn data={footerData.about} />

                            {/* Колонка 3: Terms + Clients (ОБ'ЄДНАНІ) */}
                            <div className="flex flex-col gap-10">
                                <FooterColumn data={footerData.terms} />
                                <FooterColumn data={footerData.clients} />
                            </div>

                            {/* Колонка 4: Information */}
                            <FooterColumn data={footerData.information} />
                        </div>
                    </div>

                </div>

            </footer>
            <section className="bg-white text-[rgba(51,51,51,1)] py-10 border-t border-gray-200">
                <div className="container mx-auto px-4 flex  justify-between gap-8">

                    {/* Статистика (чорні числа на білому фоні) */}
                    <div className="flex flex-wrap  gap-12 md:gap-24 text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl md:text-3xl font-medium tracking-tight ">
                                {info.registeredUsers}
                            </span>
                            <span className="text-xs md:text-sm font-medium  uppercase tracking-widest">
                                {info.registeredUsersText}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-2xl md:text-3xl font-medium tracking-tight ">
                                {info.totalJobs}
                            </span>
                            <span className="text-xs md:text-sm font-medium  uppercase tracking-widest">
                                {info.totalJobsText}
                            </span>
                        </div>

                    </div>
                    {/* Юридичний текст */}
                    <div className="flex flex-col items-center gap-1 text-center  text-base ">
                        <p className="font-medium">{info.trademark}</p>
                        <p>{info.copyright}</p>
                    </div>

                </div>
            </section>
        </>

    );
}

// Допоміжний компонент для колонок
const FooterColumn = ({ data }) => {
    if (!data) return null;
    return (
        <div className="flex flex-col gap-5">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                {data.title}
            </h4>
            <ul className="flex flex-col gap-3">
                {data.links.map((link, idx) => (
                    <li key={idx}>
                        <a href="#" className="text-sm  hover:opacity-100 hover:text-[#7EA310] transition-all whitespace-nowrap">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};