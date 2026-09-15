
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Loader from "@/shared/components/ui/Loader";
import ProBanner from "@/shared/components/ui/ProBanner";
import UserNavigation from "@/shared/components/ui/UserNavigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toLinkedCards } from "../model/MapPaymentData";
import {
    mockAvailableToWithdraw,
    mockBonusBalance,
    mockMainBalance,
    mockRate,
    mockWithdrawals,
} from "../model/mock";
import { usePaymentData } from "../model/usePaymentData";
import BalanceOverview from "./BalanceOverview";
import HistorySection from "./HistorySection";
import LinkedCardsSection from "./LinkedCardsSection";
import WithdrawFundsCard from "./WithdrawFundsCard";

interface FinancesPageProps {
    userId: string;
}

export const FinancesPage = ({ userId }: FinancesPageProps) => {
    const { t, i18n } = useTranslation("finances");

    const {
        data: paymentData,
        isLoading: isCardsLoading,
        isError: isCardsError,
    } = usePaymentData(userId);

    const cards = useMemo(() => toLinkedCards(paymentData), [paymentData]);

    const locale = i18n.language;

    if (isCardsLoading) return <Loader />

    return (
        <div className="min-h-screen bg-white dark:bg-bg-dark">
            <main className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6">
                <Breadcrumbs />

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
                    <div className="flex min-w-0 flex-col gap-10">
                        <header>
                            <h1 className="text-4xl font-semibold text-text dark:text-text-dark">
                                {t("title")}
                            </h1>
                            <p className="mt-3 max-w-[70ch] text-text-light dark:text-text-muted">
                                {t("subtitle")}
                            </p>
                        </header>

                        <BalanceOverview
                            balance={mockMainBalance}
                            bonuses={mockBonusBalance}
                            rate={mockRate}
                        />

                        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
                            <LinkedCardsSection
                                cards={cards}
                                isVerified
                                userId={userId}
                                existingCardNumber={paymentData?.maskedCardNumber}
                                isLoading={isCardsLoading}
                                isError={isCardsError}
                            />

                            <WithdrawFundsCard
                                cards={cards}
                                available={mockAvailableToWithdraw}
                                rate={mockRate}
                            />
                        </div>

                        <HistorySection withdrawals={mockWithdrawals} />

                        <ProBanner />
                    </div>

                    <aside className="lg:sticky lg:top-24">
                        <UserNavigation activeHref={`/payment-data`} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default FinancesPage;