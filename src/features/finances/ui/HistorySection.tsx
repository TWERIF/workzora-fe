import { useState } from "react";
import { useTranslation } from "react-i18next";

import { HistoryPeriod, HistoryTab, WithdrawalRecord } from "../model/types";
import HistoryTabs from "./HistoryTabs";
import PeriodSelect from "./PeriodSelect";
import WithdrawalsTable from "./WithdrawalsTable";

interface HistorySectionProps {
    withdrawals: WithdrawalRecord[];
}

export const HistorySection = ({ withdrawals }: HistorySectionProps) => {
    const { t } = useTranslation("finances");
    const [activeTab, setActiveTab] = useState<HistoryTab>("withdrawals");
    const [period, setPeriod] = useState<HistoryPeriod>("3m");

    return (
        <section className="flex min-w-0 flex-col gap-6">
            <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <HistoryTabs active={activeTab} onChange={setActiveTab} />
                <PeriodSelect value={period} onChange={setPeriod} />
            </div>

            <div
                role="tabpanel"
                id={`history-panel-${activeTab}`}
                aria-labelledby={`history-tab-${activeTab}`}
                className="flex flex-col gap-5"
            >
                {activeTab === "withdrawals" ? (
                    <>
                        <div>
                            <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                                {t("history.withdrawals.title")}
                            </h2>
                            <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                                {t("history.withdrawals.subtitle")}
                            </p>
                        </div>
                        <WithdrawalsTable records={withdrawals} />
                    </>
                ) : (
                    <div className="rounded-20 border border-dashed border-border p-10 text-center dark:border-white/15">
                        <p className="text-text-light dark:text-text-muted">
                            {t("history.comingSoon")}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HistorySection;
