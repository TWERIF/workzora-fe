import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { useCreatePaymentData, useUpdatePaymentData } from "../model/usePaymentData";

const isValidCardNumber = (value: string): boolean => {
    const digits = value.replace(/\s/g, "");
    if (!/^\d{16,19}$/.test(digits)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    return digits.replace(/(.{4})/g, "$1 ").trim();
};

interface PaymentDataFormProps {
    userId?: string;
    /** Передайте номер, щоб форма пішла в PUT замість POST */
    existingCardNumber?: string;
    onSuccess?: () => void;
}

export const PaymentDataForm = ({
    userId,
    existingCardNumber,
    onSuccess,
}: PaymentDataFormProps = {}) => {
    const { t } = useTranslation("payment-data");

    const isEditing = !!existingCardNumber;

    const createMutation = useCreatePaymentData(userId);
    const updateMutation = useUpdatePaymentData(userId);

    const mutation = isEditing ? updateMutation : createMutation;

    const form = useForm({
        defaultValues: {
            cardNumber: existingCardNumber ?? "",
        },
        onSubmit: async ({ value }) => {
            await mutation.mutateAsync({
                cardNumber: value.cardNumber.replace(/\s/g, ""),
            });
            onSuccess?.();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="flex w-full max-w-sm flex-col gap-3"
        >
            <form.Field
                name="cardNumber"
                validators={{
                    onChange: ({ value }) => {
                        if (!value.trim()) {
                            return t("paymentData.errors.required");
                        }
                        if (!isValidCardNumber(value)) {
                            return t("paymentData.errors.invalid");
                        }
                        return undefined;
                    },
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium text-text-muted"
                        >
                            {t("paymentData.cardNumber")}
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="0000 0000 0000 0000"
                            value={formatCardNumber(field.state.value)}
                            onChange={(e) =>
                                field.handleChange(formatCardNumber(e.target.value))
                            }
                            onBlur={field.handleBlur}
                            className={`rounded-20 border bg-input px-4 py-2 text-text shadow-input outline-none transition-colors placeholder-text-muted dark:bg-input-dark dark:text-text-dark dark:shadow-input-dark ${field.state.meta.errors.length > 0
                                ? "border-status-danger"
                                : "border-border"
                                }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                            <span className="text-sm text-status-danger">
                                {field.state.meta.errors.join(", ")}
                            </span>
                        )}
                    </div>
                )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <ButtonGradient
                        type="submit"
                        text={
                            isSubmitting
                                ? t("paymentData.saving")
                                : isEditing
                                    ? t("paymentData.update")
                                    : t("paymentData.add")
                        }
                        disabled={!canSubmit || isSubmitting}
                        className="w-full rounded-[100px] bg-gradient px-4 py-3 font-medium text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                    />
                )}
            </form.Subscribe>

            {mutation.isError && (
                <span className="text-sm text-status-danger">
                    {t("paymentData.errors.saveFailed")}
                </span>
            )}
        </form>
    );
};

export default PaymentDataForm;