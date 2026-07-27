import { Calendar } from "@/shared/components/svg/Calendar";
import { ClockChat } from "@/shared/components/svg/ClockChat";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import dayjs from "dayjs";

import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export const ChatProjectComplete = ({ createdAt, deadline, onComplete, onArbitration }:
    { createdAt: Date, deadline: number, onComplete: () => void, onArbitration: () => void }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { t, i18n } = useTranslation("chat");

    const finalDate = dayjs(createdAt)
        .add(deadline, "day")
        .locale(i18n.language)
        .format("MMMM D, YYYY");
    return (
        <div className="flex justify-between p-6 items-center bg-bg dark:bg-bg-dark">
            <div className="flex gap-6">
                <div className="flex gap-3 items-center">
                    <Calendar />
                    <div className="flex flex-col gap-1">
                        <span className="opacity-70">{t("deadline")}</span>
                        <span>{finalDate}</span>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <ClockChat />
                    <div className="flex flex-col gap-1">
                        <span className="opacity-70">{t("timeLeft")}</span>
                        <span>{deadline + " " + (deadline === 1 ? t("daysLeft.daysLeft_one") : deadline > 1 && deadline < 5 ? t("daysLeft.daysLeft_few") : t("daysLeft.daysLeft_many"))}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <ButtonGradient
                    text={t("complete")}
                    onClick={onComplete}
                />
                <ButtonGradient
                    text={t("arbitration")}
                    onClick={onArbitration}
                    filled={false}
                />
            </div>
        </div>
    )
}