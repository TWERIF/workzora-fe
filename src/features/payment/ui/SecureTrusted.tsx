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

            {/* Provider / compliance badges. No official brand assets (Stripe
                wordmark, PCI DSS seal, SSL seal) are available in this project —
                these are plain text/icon stand-ins. Replace with the real logos
                when available, e.g.:
                <img src="/badges/stripe.svg" alt="Stripe" className="h-6" /> */}
            {/* <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-20 border border-border px-15 py-2 text-sm font-semibold italic text-text-muted dark:text-text-dark">
                    stripe
                </span>
                <span className="flex items-center gap-1 rounded-20 border border-success px-15 py-2 text-xs font-semibold text-success">
                    <ShieldCheck size={14} />
                    PCI DSS
                </span>
                <span className="flex items-center gap-1 rounded-20 border border-border px-15 py-2 text-xs font-semibold text-text-muted dark:text-text-dark">
                    <Lock size={14} />
                    256-bit SSL
                </span>
            </div> */}
        </div>
    );
};