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

export const PaymentDataForm = ({
    existingCardNumber,
}: {
    existingCardNumber?: string;
} = {}) => {
    const { t } = useTranslation("payment-data");

    const isEditing = !!existingCardNumber;

    const createMutation = useCreatePaymentData();
    const updateMutation = useUpdatePaymentData();

    const mutation = isEditing ? updateMutation : createMutation;

    const form = useForm({
        defaultValues: {
            cardNumber: existingCardNumber ?? "",
        },
        onSubmit: async ({ value }) => {
            await mutation.mutateAsync({
                cardNumber: value.cardNumber.replace(/\s/g, ""),
            });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="flex flex-col gap-3 w-full max-w-sm"
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
                            className={`px-4 py-2 rounded-20 border bg-input dark:bg-input-dark text-text dark:text-text-dark placeholder-text-muted outline-none shadow-input dark:shadow-input-dark transition-colors ${field.state.meta.errors.length > 0
                                ? "border-error"
                                : "border-border"
                                }`}
                        />
                        {field.state.meta.errors.length > 0 && (
                            <span className="text-sm text-error">
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
                        text={isSubmitting
                            ? t("paymentData.saving")
                            : isEditing
                                ? t("paymentData.update")
                                : t("paymentData.add")}
                        disabled={!canSubmit || isSubmitting}
                        className="w-full py-3 px-4 rounded-[100px] bg-gradient text-white font-medium shadow-md hover:shadow-lg transition-all hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                )}
            </form.Subscribe>

            {mutation.isError && (
                <span className="text-sm text-error">
                    {t("paymentData.errors.saveFailed")}
                </span>
            )}
        </form>
    );
};