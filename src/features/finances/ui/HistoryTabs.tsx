import { useTranslation } from "react-i18next";
import { HISTORY_TABS } from "../model/constants";
import { HistoryTab } from "../model/types";


interface HistoryTabsProps {
    active: HistoryTab;
    onChange: (tab: HistoryTab) => void;
}

export const HistoryTabs = ({ active, onChange }: HistoryTabsProps) => {
    const { t } = useTranslation("finances");

    return (
        <div role="tablist" className="flex min-w-0 gap-2 overflow-x-auto border-b border-border dark:border-white/10">
            {HISTORY_TABS.map((tab) => {
                const isActive = tab === active;

                return (
                    <button
                        key={tab}
                        type="button"
                        role="tab"
                        id={`history-tab-${tab}`}
                        aria-selected={isActive}
                        aria-controls={`history-panel-${tab}`}
                        onClick={() => onChange(tab)}
                        className={`-mb-px whitespace-nowrap border-b-2 px-5 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${
                            isActive
                                ? "border-success font-medium text-success"
                                : "border-transparent text-text dark:text-text-dark"
                        }`}
                    >
                        {t(`history.tabs.${tab}`)}
                    </button>
                );
            })}
        </div>
    );
};

export default HistoryTabs;
