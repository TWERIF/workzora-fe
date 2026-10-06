import Loader from "@/shared/components/ui/Loader";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { HistoryPeriod, HistoryTab } from "../model/types";
import { useTransactions, useWithdrawals } from "../model/useWallet";
import HistoryTabs from "./HistoryTabs";
import PeriodSelect from "./PeriodSelect";
import TransactionsTable from "./TransactionsTable";
import WithdrawalsTable from "./WithdrawalsTable";

export const HistorySection = () => {
    const { t } = useTranslation("finances");
    const [activeTab, setActiveTab] = useState<HistoryTab>("withdrawals");
    const [period, setPeriod] = useState<HistoryPeriod>("3m");

    // тягнемо лише дані активної вкладки
    const withdrawals = useWithdrawals(period, activeTab === "withdrawals");
    const transactions = useTransactions("balance", period, activeTab === "transactions");
    const bonuses = useTransactions("bonus", period, activeTab === "bonuses");

    const active = { withdrawals, transactions, bonuses }[activeTab];

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
                <div>
                    <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                        {t(`history.${activeTab}.title`)}
                    </h2>
                    <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                        {t(`history.${activeTab}.subtitle`)}
                    </p>
                </div>

                {active.isLoading ? (
                    <Loader />
                ) : active.isError ? (
                    <p className="text-sm text-status-danger">{t("history.error")}</p>
                ) : activeTab === "withdrawals" ? (
                    <WithdrawalsTable records={withdrawals.data ?? []} />
                ) : (
                    <TransactionsTable
                        records={(activeTab === "bonuses" ? bonuses.data : transactions.data) ?? []}
                        isBonus={activeTab === "bonuses"}
                    />
                )}
            </div>
        </section>
    );
};

export default HistorySection;
