import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCardActions } from "../model/usePaymentData";

const passesLuhn = (digits: string) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = Number(digits[digits.length - 1 - i]);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
};

const formatCardNumber = (value: string) =>
    value
        .replace(/\D/g, "")
        .slice(0, 19)
        .replace(/(.{4})/g, "$1 ")
        .trim();

const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const expiryError = (value: string) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "paymentData.errors.expiry";
    const [month, year] = value.split("/").map(Number);
    return new Date(2000 + year, month, 1).getTime() <= Date.now() ? "paymentData.errors.expired" : null;
};

const fieldClass =
    "h-[50px] w-full rounded-20 border bg-background px-15 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary";

export const PaymentDataForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { t } = useTranslation("payment-data");
    const { add } = useCardActions();
    const [number, setNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [errors, setErrors] = useState<{ number?: string; expiry?: string; form?: string }>({});

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const digits = number.replace(/\s/g, "");
        const next = {
            number: !digits ? "paymentData.errors.required" : !/^\d{12,19}$/.test(digits) || !passesLuhn(digits) ? "paymentData.errors.invalid" : undefined,
            expiry: expiryError(expiry) ?? undefined,
        };
        setErrors(next);
        if (next.number || next.expiry) return;

        try {
            await add.mutateAsync({ cardNumber: digits, expiry });
            onSuccess?.();
        } catch (error) {
            const message = isAxiosError<{ message?: string | string[] }>(error) ? error.response?.data?.message : undefined;
            setErrors({ form: typeof message === "string" && /up to/.test(message) ? "paymentData.errors.limit" : "paymentData.errors.saveFailed" });
        }
    };

    return (
        <form onSubmit={submit} noValidate className="flex w-full flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
                {t("paymentData.cardNumber")}
                <input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    value={number}
                    onChange={(event) => setNumber(formatCardNumber(event.target.value))}
                    className={`${fieldClass} ${errors.number ? "border-status-danger" : "border-main-10"}`}
                />
                {errors.number && <span className="text-xs text-status-danger">{t(errors.number)}</span>}
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
                {t("paymentData.expiry")}
                <input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                    className={`${fieldClass} max-w-[140px] ${errors.expiry ? "border-status-danger" : "border-main-10"}`}
                />
                {errors.expiry && <span className="text-xs text-status-danger">{t(errors.expiry)}</span>}
            </label>
            {errors.form && <p className="text-sm text-status-danger">{t(errors.form)}</p>}
            <button
                type="submit"
                disabled={add.isPending}
                className="mt-1 h-[45px] w-full rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
                {add.isPending ? t("paymentData.saving") : t("paymentData.add")}
            </button>
        </form>
    );
};

export default PaymentDataForm;
