import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SecureTrusted = () => {
    const { t } = useTranslation("payment");

    const items = [
        t("secureTrusted.ssl"),
        t("secureTrusted.pciDss"),
        t("secureTrusted.dataProtected"),
    ];

    return (
        <div className="w-full rounded-20 bg-bg p-6 dark:bg-bg-dark">
            <h2 className="mb-4 text-base font-semibold text-text dark:text-text-dark">
                {t("secureTrusted.title")}
            </h2>

            <ul className="space-y-2">
                {items.map((label) => (
                    <li
                        key={label}
                        className="flex items-center gap-2 text-sm text-text dark:text-text-dark"
                    >
                        <CheckCircle2 size={16} className="shrink-0 text-success" />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
};