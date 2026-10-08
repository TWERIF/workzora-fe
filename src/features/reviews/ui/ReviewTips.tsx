import InfoOutlineIcon from "@/shared/components/svg/Profile/InfoOutlineIcon";
import { useTranslation } from "react-i18next";

export const ReviewTips = () => {
    const { t } = useTranslation("review");
    const tips = t("tips.items", { returnObjects: true }) as string[];

    return (
        <aside className="flex w-full flex-col gap-4 rounded-22 border border-success/10 bg-success/5 p-6 lg:w-[317px]">
            <div className="flex items-center gap-2">
                <InfoOutlineIcon className="shrink-0" />
                <p className="flex-1 text-lg font-semibold leading-[27px] text-text dark:text-text-dark">
                    {t("tips.title")}
                </p>
            </div>
            <ul className="flex list-disc flex-col gap-2 ps-[18px] text-xs text-text dark:text-text-dark">
                {tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                ))}
            </ul>
        </aside>
    );
};
