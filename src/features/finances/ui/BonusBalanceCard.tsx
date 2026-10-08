import BonusIcon from "@/shared/components/svg/BonusIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";


export const BonusBalanceCard = ({ bonuses }: { bonuses: number }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex min-h-[190px] flex-col gap-[6px] rounded-3xl bg-surface p-6 dark:bg-input-dark">
            <h3 className="text-base font-medium leading-[29px] text-text dark:text-text-dark">
                {t("balance.bonus.title")}
            </h3>

            <div className="flex items-center gap-3">
                <BonusIcon className="shrink-0" />
                <p className="flex items-end gap-[6px]">
                    <span className="text-3xl font-semibold leading-[97.4%] text-text dark:text-text-dark">
                        {formatNumber(bonuses, i18n.language)}
                    </span>
                    <span className="text-base text-text-light dark:text-text-muted">
                        {t("balance.bonus.unit")}
                    </span>
                </p>
            </div>

            <p className="pt-[6px] text-sm text-text-light dark:text-text-muted">
                {t("balance.bonus.hint")}
            </p>
        </article>
    );
};

export default BonusBalanceCard;
