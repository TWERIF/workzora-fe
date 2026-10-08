import { useUnreadNotifications } from "@/features/notifications/model/useNotifications";

import { useAuth } from "@/features/auth/model/useAuth";
import { VerificationStatus } from "@/features/kyc/model/types";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Loader from "@/shared/components/ui/Loader";
import ProBanner from "@/shared/components/ui/ProBanner";
import UserNavigation from "@/shared/components/ui/UserNavigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toLinkedCards } from "../model/MapPaymentData";
import { useCards } from "../model/usePaymentData";
import { useExchangeRate, useWalletSummary } from "../model/useWallet";
import WalletBalanceOverview from "./WalletBalanceOverview";
import HistorySection from "./HistorySection";
import LinkedCardsSection from "./LinkedCardsSection";
import WithdrawFundsCard from "./WithdrawFundsCard";

interface FinancesPageProps {
    userId: string;
}

export const FinancesPage = ({ userId }: FinancesPageProps) => {
    const { data: unreadNotifications } = useUnreadNotifications();
    const { t } = useTranslation("finances");
    const { user } = useAuth();
    const isVerified = user?.verification?.status === VerificationStatus.VERIFIED;

    const { data: paymentCards, isLoading: isCardsLoading, isError: isCardsError } = useCards(Boolean(userId));

    const { data: wallet, isLoading: isWalletLoading } = useWalletSummary(Boolean(userId));
    const { data: exchangeRate } = useExchangeRate();

    const cards = useMemo(() => toLinkedCards(paymentCards), [paymentCards]);

    const balance = wallet?.balance ?? 0;
    const rate = exchangeRate?.rate ?? 0;

    if (isCardsLoading || isWalletLoading) return <Loader />

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

                        <WalletBalanceOverview />

                        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
                            <LinkedCardsSection
                                cards={cards}
                                isVerified={isVerified}
                                isLoading={isCardsLoading}
                                isError={isCardsError}
                            />

                            <WithdrawFundsCard
                                cards={cards}
                                available={balance}
                                rate={rate}
                            />
                        </div>

                        <HistorySection />

                        <ProBanner />
                    </div>

                    <aside className="lg:sticky lg:top-24">
                        <UserNavigation activeHref={`/payment-data`} notificationsCount={unreadNotifications?.total ?? 0} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default FinancesPage;