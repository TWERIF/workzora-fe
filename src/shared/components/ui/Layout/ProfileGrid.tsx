import React from 'react'
import ProfileCardSmall from '../Card/ProfileCardSmall'
import { useTranslation } from 'react-i18next';
import IconArrow from '../../svg/IconArrow';

export default function ProfileGrid({ items, title }) {
    const { t } = useTranslation("common");
    const freelancers = t("community.freelancers", { returnObjects: true });
    return (
        /* Додано p-8 (padding), rounded-3xl для гарних кутів та кастомну тінь */
        <div
            className="flex flex-col gap-10 bg-white p-8 md:p-12 rounded-[40px]"
        >
            <h2 className="text-[55px] font-bold  pl-4 text-black">
                {title.top}<br />
                <span className='text-success'>
                    {title.role}
                </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-6">
                {/* Рендеримо 14 карток */}
                {[...Array(14)].map((_, i) => (
                    <ProfileCardSmall
                        profile={Array.isArray(freelancers) ? freelancers[0] : {}}
                        key={i}
                    />
                ))}

                {/* 15-й елемент: Кнопка Show All */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <button className="w-24 h-24  flex flex-col items-center justify-center  gap-2 p-2">
                        <span className="text-[12px] text-success font-bold uppercase tracking-tighter text-center leading-tight">
                            {t("community.showAll")}
                        </span>
                        <IconArrow />
                    </button>
                </div>
            </div>
        </div>
    )
}