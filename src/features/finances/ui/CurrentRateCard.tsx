import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../model/format";


export const CurrentRateCard = ({ rate }: { rate: number }) => {
    const { t, i18n } = useTranslation("finances");

    return (
        <article className="flex flex-col gap-3 rounded-20 border border-border p-6 dark:border-white/10">
            <h3 className="text-base font-medium text-text dark:text-text-dark">
                {t("balance.rate.title")}
            </h3>

            <p className="flex items-center gap-2 text-text dark:text-text-dark">
                <UsdtIcon/>
                <span className="font-medium">
                    1 ≈ ₴{formatNumber(rate, i18n.language)}
                </span>
            </p>

            <p className="mt-auto text-sm leading-relaxed text-text-light dark:text-text-muted">
                {t("balance.rate.hint")}
            </p>
        </article>
    );
};

export default CurrentRateCard;
