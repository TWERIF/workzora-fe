import InfoIcon from "@/shared/components/svg/InfoIcon";
import { useTranslation } from "react-i18next";
import AuthField from "./AuthField";

interface CodeStepProps {
    length: number;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    resendLeft: number;
    onResend: () => void;
}

export default function CodeStep({ length, value, onChange, error, resendLeft, onResend }: CodeStepProps) {
    const { t } = useTranslation("auth");

    return (
        <>
            <AuthField
                label={t("fields.code")}
                icon="lock"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={length}
                placeholder={t("fields.codePlaceholder", { count: length })}
                value={value}
                onChange={(next) => onChange(next.replace(/\D/g, "").slice(0, length))}
                error={error}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span>{t("recovery.noCode")}</span>
                <button
                    type="button"
                    onClick={onResend}
                    disabled={resendLeft > 0}
                    className="border-b border-dashed border-primary text-primary disabled:border-transparent disabled:text-main-50"
                >
                    {resendLeft > 0 ? t("recovery.resendIn", { seconds: resendLeft }) : t("recovery.resend")}
                </button>
            </div>
            <p className="flex gap-2 rounded-20 border border-primary/20 bg-primary-10 p-15 text-xs leading-5 text-main-50">
                <span className="mt-0.5 shrink-0 text-primary">
                    <InfoIcon />
                </span>
                {t("recovery.spamHint")}
            </p>
        </>
    );
}
