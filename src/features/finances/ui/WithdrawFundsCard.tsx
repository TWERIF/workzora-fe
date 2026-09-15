import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { MIN_WITHDRAW_AMOUNT, WITHDRAW_PROCESSING_DAYS } from "../model/constants";
import { formatMoney, formatNumber, maskedCard } from "../model/format";
import { LinkedCard } from "../model/types";
import { useCreateWithdrawal } from "../model/useWithdraw";


interface WithdrawFundsCardProps {
    cards: LinkedCard[];
    available: number;
    rate: number;
}

export const WithdrawFundsCard = ({
    cards,
    available,
    rate,
}: WithdrawFundsCardProps) => {
    const { t, i18n } = useTranslation("finances");
    const mutation = useCreateWithdrawal();

    const primaryCard = cards.find((card) => card.isPrimary) ?? cards[0];

    const form = useForm({
        defaultValues: {
            amount: "100",
            cardId: primaryCard?.id ?? "",
        },
        onSubmit: async ({ value }) => {
            await mutation.mutateAsync({
                amount: Number(value.amount),
                cardId: value.cardId,
            });
        },
    });

    const inputClasses =
        "w-full rounded-20 border border-border bg-input px-4 py-3 text-text outline-none transition-colors focus:border-success dark:border-white/10 dark:bg-input-dark dark:text-text-dark";

    return (
        <section className="flex h-fit flex-col gap-4 rounded-20 bg-white p-6 shadow-card dark:bg-input-dark dark:shadow-card-dark">
            <div>
                <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                    {t("withdraw.title")}
                </h2>
                <p className="mt-2 text-sm text-text-light dark:text-text-muted">
                    {t("withdraw.subtitle")}
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="flex flex-col gap-4"
            >
                <form.Field
                    name="amount"
                    validators={{
                        onChange: ({ value }) => {
                            const amount = Number(value);
                            if (!value.trim()) return t("withdraw.errors.required");
                            if (Number.isNaN(amount) || amount < MIN_WITHDRAW_AMOUNT) {
                                return t("withdraw.errors.min", {
                                    amount: formatMoney(MIN_WITHDRAW_AMOUNT, i18n.language),
                                });
                            }
                            if (amount > available) {
                                return t("withdraw.errors.max", {
                                    amount: formatMoney(available, i18n.language),
                                });
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
                                {t("withdraw.amount")}
                            </label>

                            <div
                                className={`flex items-stretch overflow-hidden rounded-20 border ${field.state.meta.errors.length > 0
                                        ? "border-status-danger"
                                        : "border-border dark:border-white/10"
                                    }`}
                            >
                                <span className="flex items-center border-r border-border px-4 text-text-light dark:border-white/10 dark:text-text-muted">
                                    $
                                </span>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    inputMode="decimal"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="w-full bg-input px-4 py-3 text-text outline-none dark:bg-input-dark dark:text-text-dark"
                                />
                            </div>

                            <p className="text-sm text-text-light dark:text-text-muted">
                                {t("withdraw.available", {
                                    amount: formatMoney(available, i18n.language),
                                })}
                            </p>

                            {field.state.meta.errors.length > 0 && (
                                <span className="text-sm text-status-danger">
                                    {field.state.meta.errors.join(", ")}
                                </span>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="cardId"
                    validators={{
                        onChange: ({ value }) =>
                            value ? undefined : t("withdraw.errors.noCard"),
                    }}
                >
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor={field.name}
                                className="text-sm font-medium text-text-muted"
                            >
                                {t("withdraw.target")}
                            </label>

                            <select
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                disabled={cards.length === 0}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className={`${inputClasses} disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                                {cards.length === 0 ? (
                                    <option value="">{t("withdraw.noCards")}</option>
                                ) : (
                                    cards.map((card) => (
                                        <option key={card.id} value={card.id}>
                                            {`${card.brand === "visa" ? "Visa" : "Mastercard"} ${maskedCard(
                                                card.last4,
                                            )}${card.isPrimary ? ` (${t("cards.primary")})` : ""}`}
                                        </option>
                                    ))
                                )}
                            </select>

                            {field.state.meta.errors.length > 0 && (
                                <span className="text-sm text-status-danger">
                                    {field.state.meta.errors.join(", ")}
                                </span>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Subscribe selector={(state) => state.values.amount}>
                    {(amount) => (
                        <dl className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <dt className="text-text-light dark:text-text-muted">
                                    {t("withdraw.willReceive")}
                                </dt>
                                <dd className="font-medium text-text dark:text-text-dark">
                                    ≈ ₴
                                    {formatNumber(
                                        Math.round((Number(amount) || 0) * rate),
                                        i18n.language,
                                    )}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <dt className="text-text-light dark:text-text-muted">
                                    {t("withdraw.processingTime")}
                                </dt>
                                <dd className="text-text dark:text-text-dark">
                                    <span className="font-medium">
                                        {WITHDRAW_PROCESSING_DAYS}
                                    </span>{" "}
                                    <span className="text-text-light dark:text-text-muted">
                                        {t("withdraw.businessDays")}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    )}
                </form.Subscribe>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                >
                    {([canSubmit, isSubmitting]) => (
                        <ButtonGradient
                            type="submit"
                            text={
                                isSubmitting ? t("withdraw.submitting") : t("withdraw.submit")
                            }
                            disabled={!canSubmit || isSubmitting || cards.length === 0}
                            className="w-full rounded-[100px] bg-gradient px-4 py-3 font-medium text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    )}
                </form.Subscribe>

                {mutation.isError && (
                    <span className="text-sm text-status-danger">
                        {t("withdraw.errors.failed")}
                    </span>
                )}
            </form>
        </section>
    );
};

export default WithdrawFundsCard;
