import { IconLock } from "@/shared/components/svg/IconLock";
import { Info, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OrderSummaryProps {
    projectBudget: number;
    platformFeeRate?: number;
    currencySymbol?: string;
}

export const OrderSummary = ({
    projectBudget,
    platformFeeRate = 0.05,
    currencySymbol = "$",
}: OrderSummaryProps) => {
    const { t } = useTranslation("payment");

    const platformFee = projectBudget * platformFeeRate;
    const total = projectBudget + platformFee;

    const format = (value: number) => `${currencySymbol}${value.toFixed(2)}`;

    return (
        <div className="w-full rounded-20 bg-bg p-6 dark:bg-bg-dark">
            <h2 className="mb-4 text-lg font-semibold text-text dark:text-text-dark">
                {t("orderSummary.title")}
            </h2>

            <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-text dark:text-text-dark">
                    <span>{t("orderSummary.projectBudget")}</span>
                    <span>{format(projectBudget)}</span>
                </div>

                <div className="flex items-center justify-between text-text dark:text-text-dark">
                    <span className="flex items-center gap-1">
                        {t("orderSummary.platformFee")}
                        <Info
                            size={14}
                            className="text-text-muted"
                            aria-label={t("orderSummary.platformFeeInfo")}
                        />
                    </span>
                    <span>{format(platformFee)}</span>
                </div>
            </div>

            <div className="my-4 border-t border-border" />

            <div className="flex items-center justify-between font-semibold text-text dark:text-text-dark">
                <span>{t("orderSummary.total")}</span>
                <span>{format(total)}</span>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-20 bg-input px-15 py-13 text-xs text-text-muted dark:bg-input-dark">
                <IconLock />
                <span>{t("orderSummary.escrowNotice")}</span>
            </div>
        </div>
    );
};