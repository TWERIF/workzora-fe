import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";


export const CurrentRateCard = ({ rate }: { rate: number }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex min-h-[190px] flex-col gap-3 rounded-3xl border border-border-light px-4 py-6 dark:border-white/10">
            <h3 className="text-base font-medium leading-[29px] text-text dark:text-text-dark">
                {t("balance.rate.title")}
            </h3>

            <p className="flex items-center gap-3 text-lg font-medium leading-[1.461] text-text dark:text-text-dark">
                <UsdtIcon width={25} height={25} />
                <span>1 ≈ ₴{formatNumber(rate, i18n.language)}</span>
            </p>

            <p className="mt-[6px] text-xs text-text-light dark:text-text-muted">
                {t("balance.rate.hint")}
            </p>
        </article>
    );
};

export default CurrentRateCard;
