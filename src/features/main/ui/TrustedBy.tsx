import IconAdidas from '@/shared/components/svg/IconAdidas';
import IconApple from '@/shared/components/svg/IconApple';
import IconIbm from '@/shared/components/svg/IconIbm';
import IconM9cow from '@/shared/components/svg/IconM9cow';
import IconTesla from '@/shared/components/svg/IconTesla';
import { Notion } from '@/shared/components/svg/Notion';
import { Whirpool } from '@/shared/components/svg/Whirpool';
import Marquee from '@/shared/components/ui/Marquee/Marquee';
import { useWindowWidth } from '@/utils/useWindowsWidth';
import { useTranslation } from 'react-i18next';
const LOGOS = [
    IconAdidas, IconM9cow, IconApple, IconIbm, IconTesla, Whirpool, Notion
];

export default function TrustedBy() {
    const { t } = useTranslation("main");
    const width = useWindowWidth()
    const isMobile: boolean = width > 1260 ? false : true;

    return (
        <section className="bg-[#333333] text-white py-8">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8 md:gap-10">
                <span className="opacity-70 uppercase tracking-wider text-xs font-semibold">
                    {t("hero.asUsedBy")}
                </span>
                {!isMobile ? <div className="flex items-center justify-center gap-6 md:gap-12">
                    {LOGOS.map((Icon, idx) => (
                        <div key={idx} className="bg-[#3E3E3E] flex-1 p-[28px] h-[75px] flex items-center rounded-[16px] grayscale hover:grayscale-0 transition-all duration-300 scale-75 md:scale-100">
                            <Icon />
                        </div>
                    ))}
                </div> : <Marquee>                    {LOGOS.map((Icon, idx) => (
                    <div key={idx} className="bg-[#3E3E3E] flex-1 p-[28px] h-[75px] flex items-center rounded-[16px] grayscale hover:grayscale-0 transition-all duration-300 scale-75 md:scale-100">
                        <Icon />
                    </div>
                ))}</Marquee>}
            </div>
        </section>
    )
}
