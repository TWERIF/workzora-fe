import InfoIcon from "@/shared/components/svg/InfoIcon";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";
import { Balance } from "../model/types";


export const MainBalanceCard = ({ balance }: { balance: Balance }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex flex-col gap-3 rounded-20 bg-[#F5F5F5] p-6 dark:bg-[#7EA3101A]">
            <h3 className="text-base font-medium text-text dark:text-text-dark">
                {t("balance.main.title")}
            </h3>

            <p className="flex items-center gap-3">
                <UsdtIcon width={22} height={22} />
                <span className="text-3xl font-semibold text-text dark:text-text-dark">
                    {formatNumber(balance.amount, i18n.language)}
                </span>
            </p>

            <p className="flex items-center gap-1.5 text-sm text-text-light dark:text-text-muted">
                ≈ ₴{formatNumber(balance.uahEquivalent, i18n.language)}
                <span title={t("balance.main.tooltip")} className="cursor-help">
                    <InfoIcon />
                </span>
            </p>

            <p className="mt-auto text-sm text-text-light dark:text-text-muted">
                {t("balance.main.hint")}
            </p>
        </article>
    );
};

export default MainBalanceCard;
