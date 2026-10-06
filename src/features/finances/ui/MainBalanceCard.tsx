import InfoCircleIcon from "@/shared/components/svg/Profile/InfoCircleIcon";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";
import { Balance } from "../model/types";


export const MainBalanceCard = ({ balance }: { balance: Balance }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex min-h-[190px] flex-col gap-[6px] rounded-3xl bg-surface-success p-6 dark:bg-[#7EA3101A]">
            <h3 className="text-base font-medium leading-[29px] text-text dark:text-text-dark">
                {t("balance.main.title")}
            </h3>

            <p className="flex items-center gap-3">
                <UsdtIcon width={42} height={42} />
                <span className="text-3xl font-semibold leading-[97.4%] text-text dark:text-text-dark">
                    {formatNumber(balance.amount, i18n.language)}
                </span>
            </p>

            <p className="flex items-center gap-2 text-base text-text-light dark:text-text-muted">
                ≈ ₴{formatNumber(balance.uahEquivalent, i18n.language)}
                <span title={t("balance.main.tooltip")} className="flex size-4 cursor-help items-center justify-center">
                    <InfoCircleIcon />
                </span>
            </p>

            <p className="pt-[6px] text-sm text-text-light dark:text-text-muted">
                {t("balance.main.hint")}
            </p>
        </article>
    );
};

export default MainBalanceCard;
