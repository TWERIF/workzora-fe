import IconAdidas from '@/shared/components/svg/IconAdidas';
import IconApple from '@/shared/components/svg/IconApple';
import IconBmw from '@/shared/components/svg/IconBmw';
import IconIbm from '@/shared/components/svg/IconIbm';
import IconM9cow from '@/shared/components/svg/IconM9cow';
import IconTesla from '@/shared/components/svg/IconTesla';
import React from 'react'
import { useTranslation } from 'react-i18next';
const LOGOS = [
    IconM9cow, IconAdidas, IconBmw, IconIbm,
    IconApple, IconTesla, IconM9cow, IconAdidas
];

export default function TrustedBy() {
    const { t } = useTranslation("common");

    return (
        <section className="bg-[#333333] text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
                <span className="opacity-70 uppercase tracking-wider text-xs font-semibold">
                    {t("hero.asUsedBy")}
                </span>
                <div className="grid grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-6 md:gap-12">
                    {LOGOS.map((Icon, idx) => (
                        <div key={idx} className="grayscale hover:grayscale-0 transition-all duration-300 scale-75 md:scale-100">
                            <Icon />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
