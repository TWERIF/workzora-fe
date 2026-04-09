import BidsIcon from '@/components/svg/AccountSettings/BidsIcon';
import CabinetIcon from '@/components/svg/AccountSettings/CabinetIcon';
import CompetitionsIcon from '@/components/svg/AccountSettings/CompetitionsIcon';
import CorrespondenceIcon from '@/components/svg/AccountSettings/CorrespondenceIcon';
import CustomerProfileIcon from '@/components/svg/AccountSettings/CustomerProfileIcon';
import FinancesIcon from '@/components/svg/AccountSettings/FinancesIcon';
import NewsIcon from '@/components/svg/AccountSettings/NewsIcon';
import PerformerProfileIcon from '@/components/svg/AccountSettings/PerformerProfileIcon';
import PortfolioIcon from '@/components/svg/AccountSettings/PortfolioIcon';
import ProAccountIcon from '@/components/svg/AccountSettings/ProAccountIcon';
import ProfileDescIcon from '@/components/svg/AccountSettings/ProfileDescIcon';
import ReviewsIcon from '@/components/svg/AccountSettings/ReviewsIcon';
import SettingsIcon from '@/components/svg/AccountSettings/SettingsIcon';
import StatisticsIcon from '@/components/svg/AccountSettings/StatisticsIcon';
import SupportIcon from '@/components/svg/AccountSettings/SupportIcon';
import React from 'react';

const AccountSettings = () => {
    const mainLinks = [
        { name: 'Cabinet', icon: CabinetIcon },
        { name: 'Correspondence', icon: CorrespondenceIcon },
        { name: 'Bids', icon: BidsIcon },
        { name: 'Competitions', icon: CompetitionsIcon },
        { name: 'Reviews', icon: ReviewsIcon },
        { name: 'Finances', icon: FinancesIcon },
        { name: 'Portfolio', icon: PortfolioIcon },
        { name: 'Statistics', icon: StatisticsIcon },
    ];

    const secondaryLinks = [
        { name: 'Profile Description', icon: ProfileDescIcon },
        { name: 'Performer Profile', icon: PerformerProfileIcon },
        { name: 'Customer Profile', icon: CustomerProfileIcon },
        { name: 'Settings', icon: SettingsIcon },
        { name: 'Pro Account', icon: ProAccountIcon },
        { name: 'Support', icon: SupportIcon },
        { name: 'News', icon: NewsIcon },
    ];

    // Спільний компонент для елемента списку
    const NavItem = ({ link }) => {
        // Деструктуризуємо іконку, присвоюючи її змінній з великої літери
        const Icon = link.icon;

        return (
            <div className="flex items-center gap-3 py-2 px-1 cursor-pointer hover:bg-gray-50 transition-colors rounded-md group">
                <Icon />
                <span className="text-[#333333] text-xs font-normal group-hover:text-black">
                    {link.name}
                </span>
            </div>
        );
    };

    return (
        <div className="max-w-[400px] bg-white   rounded-[40px] p-8 shadow-sm font-sans">
            <h2 className="text-2xl font-bold text-[#333333] mb-6 tracking-tight">
                Account settings
            </h2>

            {/* Основна секція */}
            <div className="space-y-1 mb-6">
                {mainLinks.map((link) => (

                    <NavItem key={link.name} link={link} />
                ))}
            </div>

            {/* Розділювач */}
            <hr className="border-t border-gray-300 mb-6" />

            {/* Друга секція */}
            <div className="space-y-1">
                {secondaryLinks.map((link) => (
                    <NavItem key={link.name} link={link} />
                ))}
            </div>
        </div>
    );
};

export default AccountSettings;