import { IconCheckSmall } from "@/shared/components/svg/AuthIcons";
import { useTranslation } from "react-i18next";
import { PASSWORD_RULES } from "../model/validation";

export default function PasswordRequirements({ password }: { password: string }) {
    const { t } = useTranslation("auth");

    return (
        <div>
            <p className="text-sm leading-[26px]">{t("recovery.requirements")}</p>
            <ul className="mt-1 flex flex-col gap-1">
                {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(password);
                    return (
                        <li key={rule.key} className={`flex items-center gap-2 text-xs ${passed ? "text-primary" : "text-main-50"}`}>
                            <IconCheckSmall />
                            {t(`rules.${rule.key}`)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
