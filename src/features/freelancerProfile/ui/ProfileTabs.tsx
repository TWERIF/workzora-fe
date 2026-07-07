import { useTranslation } from "react-i18next";

export type ProfileTab = "about" | "portfolio" | "skills" | "reviews";

interface ProfileTabsProps {
    active: ProfileTab;
    onChange: (tab: ProfileTab) => void;
}

const TABS: ProfileTab[] = ["about", "portfolio", "skills", "reviews"];

export const ProfileTabs = ({ active, onChange }: ProfileTabsProps) => {
    const { t } = useTranslation("common");

    return (
        <nav className="flex flex-wrap gap-2" role="tablist">
            {TABS.map((tab) => {
                const isActive = tab === active;
                return (
                    <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(tab)}
                        className={`rounded-20 px-15 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-gradient text-white"
                                : "border border-border bg-bg-header text-text-muted dark:bg-bg-modalDark"
                            }`}
                    >
                        {t(`profile.tabs.${tab}`)}
                    </button>
                );
            })}
        </nav>
    );
};