import BonusIcon from "@/shared/components/svg/BonusIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";


export const BonusBalanceCard = ({ bonuses }: { bonuses: number }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex flex-col gap-3 rounded-20 bg-[#F5F5F5] p-6 dark:bg-input-dark">
            <h3 className="text-base font-medium text-text dark:text-text-dark">
                {t("balance.bonus.title")}
            </h3>

            <p className="flex items-baseline gap-3">
                <BonusIcon className="self-center" />
                <span className="text-3xl font-semibold text-text dark:text-text-dark">
                    {formatNumber(bonuses, i18n.language)}
                </span>
                <span className="text-sm text-text-light dark:text-text-muted">
                    {t("balance.bonus.unit")}
                </span>
            </p>

            <p className="mt-auto text-sm text-text-light dark:text-text-muted">
                {t("balance.bonus.hint")}
            </p>
        </article>
    );
};

export default BonusBalanceCard;
