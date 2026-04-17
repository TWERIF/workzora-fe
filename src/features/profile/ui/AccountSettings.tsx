
import BidsIcon from '@/shared/components/svg/AccountSettings/BidsIcon';
import CabinetIcon from '@/shared/components/svg/AccountSettings/CabinetIcon';
import CompetitionsIcon from '@/shared/components/svg/AccountSettings/CompetitionsIcon';
import CorrespondenceIcon from '@/shared/components/svg/AccountSettings/CorrespondenceIcon';
import CustomerProfileIcon from '@/shared/components/svg/AccountSettings/CustomerProfileIcon';
import FinancesIcon from '@/shared/components/svg/AccountSettings/FinancesIcon';
import NewsIcon from '@/shared/components/svg/AccountSettings/NewsIcon';
import PerformerProfileIcon from '@/shared/components/svg/AccountSettings/PerformerProfileIcon';
import PortfolioIcon from '@/shared/components/svg/AccountSettings/PortfolioIcon';
import ProAccountIcon from '@/shared/components/svg/AccountSettings/ProAccountIcon';
import ProfileDescIcon from '@/shared/components/svg/AccountSettings/ProfileDescIcon';
import ReviewsIcon from '@/shared/components/svg/AccountSettings/ReviewsIcon';
import SettingsIcon from '@/shared/components/svg/AccountSettings/SettingsIcon';
import StatisticsIcon from '@/shared/components/svg/AccountSettings/StatisticsIcon';
import SupportIcon from '@/shared/components/svg/AccountSettings/SupportIcon';
import IconArrowSmall from '@/shared/components/svg/IconArrowSmall';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AccountSettings = () => {
    const { t } = useTranslation("common");
    const [isOpen, setIsOpen] = useState(false);

    const mainLinks = [
        { name: t('profilePage.settings_menu.cabinet'), icon: CabinetIcon },
        { name: t('profilePage.settings_menu.correspondence'), icon: CorrespondenceIcon },
        { name: t('profilePage.settings_menu.bids'), icon: BidsIcon },
        { name: t('profilePage.settings_menu.competitions'), icon: CompetitionsIcon },
        { name: t('profilePage.settings_menu.reviews'), icon: ReviewsIcon },
        { name: t('profilePage.settings_menu.finances'), icon: FinancesIcon },
        { name: t('profilePage.settings_menu.portfolio'), icon: PortfolioIcon },
        { name: t('profilePage.settings_menu.statistics'), icon: StatisticsIcon },
    ];

    const secondaryLinks = [
        { name: t('profilePage.settings_menu.profile_desc'), icon: ProfileDescIcon },
        { name: t('profilePage.settings_menu.performer_profile'), icon: PerformerProfileIcon },
        { name: t('profilePage.settings_menu.customer_profile'), icon: CustomerProfileIcon },
        { name: t('profilePage.settings_menu.settings'), icon: SettingsIcon },
        { name: t('profilePage.settings_menu.pro_account'), icon: ProAccountIcon },
        { name: t('profilePage.settings_menu.support'), icon: SupportIcon },
        { name: t('profilePage.settings_menu.news'), icon: NewsIcon },
    ];

    const NavItem = ({ link }: { link: any }) => {
        const Icon = link.icon;
        return (
            <div className="flex items-center gap-3 py-2 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors rounded-md group">
                <Icon />
                <span className="text-[#333333] dark:text-gray-300 text-xs font-normal group-hover:text-black dark:group-hover:text-white">
                    {link.name}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full lg:max-w-[400px] bg-white dark:bg-[#1A1A1A] rounded-[30px] lg:rounded-[40px] p-6 lg:p-8 shadow-sm font-sans">
            {/* Заголовок-тригер для мобільних пристроїв */}
            <div
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-xl lg:text-2xl font-bold text-[#333333] dark:text-white tracking-tight">
                    {t('profilePage.settings_menu.title')}
                </h2>
                {/* Іконка стрілочки, видима тільки на мобайлі */}
                <div className="lg:hidden text-[#333333] dark:text-white">
                    {isOpen ? <div className='rotate-90'> <IconArrowSmall h={20} w={20} /></div> :
                        <IconArrowSmall h={20} w={20} />
                    }
                </div>
            </div>

            {/* Контент списку: прихований на мобайлі за замовчуванням, завжди видимий на десктопі */}
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block mt-6 lg:mt-6 transition-all duration-300`}>
                <div className="space-y-1 mb-6">
                    {mainLinks.map((link) => (
                        <NavItem key={link.name} link={link} />
                    ))}
                </div>

                <hr className="border-t border-gray-300 dark:border-zinc-700 mb-6" />

                <div className="space-y-1">
                    {secondaryLinks.map((link) => (
                        <NavItem key={link.name} link={link} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;