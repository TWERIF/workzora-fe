import { useTranslation } from "react-i18next";

export type ProfileTab = "about" | "portfolio" | "skills" | "reviews";

interface ProfileTabsProps {
    active: ProfileTab;
    onChange: (tab: ProfileTab) => void;
    counts?: Partial<Record<ProfileTab, number>>;
}

const TABS: ProfileTab[] = ["about", "portfolio", "skills", "reviews"];

export const ProfileTabs = ({ active, onChange, counts }: ProfileTabsProps) => {
    const { t } = useTranslation("common");

    return (
        <nav className="grid grid-cols-2 gap-[15px] rounded-3xl bg-surface p-3 dark:bg-bg-modalDark sm:flex sm:rounded-full" role="tablist">
            {TABS.map((tab) => {
                const isActive = tab === active;
                const count = counts?.[tab];
                return (
                    <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(tab)}
                        className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-6 py-4 text-base transition-colors ${isActive
                                ? "border-success bg-success text-white"
                                : "border-transparent bg-bg-header text-text hover:border-success dark:bg-input-dark dark:text-text-dark"
                            }`}
                    >
                        {t(`profile.tabs.${tab}`)}
                        {count != null && ` (${count})`}
                    </button>
                );
            })}
        </nav>
    );
};
