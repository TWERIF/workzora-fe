import { ApplePay } from "@/shared/components/svg/ApplePay";
import { ApplePayWhite } from "@/shared/components/svg/ApplePayWhite";
import { GooglePay } from "@/shared/components/svg/GooglePay";
import { IconLock } from "@/shared/components/svg/IconLock";
import { Paypal } from "@/shared/components/svg/Paypal";
import { CreditCard, ExternalLink, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateEscrowPayload, Escrow } from "../model/types";
import { useCreateEscrow, useInvoiceStatus } from "../model/usePayment";

type PaymentMethod = "card" | "apple-pay" | "google-pay" | "paypal";

interface CardFormValues {
    paymentMethod: PaymentMethod;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardholderName: string;
}

// Escrow context that doesn't come from the form itself — this is the
// invoice being paid, passed down from whatever page renders the form
// (project checkout page, dispute payout, etc).
interface PaymentFormProps {
    amount: number;
    currencyCode: number;
    projectId: string;
    clientId: string;
    freelancerId: string;
    onSuccess?: (escrow: Escrow) => void;
    // Lets the page put the actual "Submit payment" button somewhere else
    // in the layout (e.g. the order summary sidebar) while it still
    // triggers this <form>'s submit via the native `form="..."` attribute.
    formId?: string;
    // Surfaces isPending so an external submit button (see formId above)
    // can show its own "Processing..." state and disable itself.
    onPendingChange?: (isPending: boolean) => void;
}

const PAYMENT_METHODS: PaymentMethod[] = ["card", "apple-pay", "google-pay", "paypal"];

// Monobank acquiring doesn't support PayPal as a payment method — kept in
// the UI to match the design, but disabled.
const DISABLED_METHODS: PaymentMethod[] = ["paypal"];

const formatCardNumber = (value: string) =>
    value
        .replace(/\D/g, "")
        .slice(0, 19)
        .replace(/(.{4})/g, "$1 ")
        .trim();

const formatExpirationDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const PaymentForm = ({
    amount,
    currencyCode,
    projectId,
    clientId,
    freelancerId,
    onSuccess,
    formId = "payment-form",
    onPendingChange,
}: PaymentFormProps) => {
    const { t } = useTranslation("payment");
    const [activeMethod, setActiveMethod] = useState<PaymentMethod>("card");

    // Escrow invoice created via Monobank — pageUrl is the hosted checkout
    // page, embedded below in an iframe instead of a full-page redirect so
    // the user stays on this screen. invoiceId is polled for status since
    // a cross-origin iframe can't tell us when the payment finished.
    const [checkoutInvoice, setCheckoutInvoice] = useState<{
        invoiceId: string;
        pageUrl: string;
    } | null>(null);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CardFormValues>({
        defaultValues: {
            paymentMethod: "card",
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            cardholderName: "",
        },
    });

    const { mutate: createEscrow, isPending } = useCreateEscrow();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    useEffect(() => {
        onPendingChange?.(isPending);
    }, [isPending, onPendingChange]);

    const onSubmit = () => {
        // NOTE: card number / CVV fields above are never sent to our own
        // backend — Monobank requires an active PCI DSS certificate to
        // accept raw card data on a merchant-hosted form (their
        // /invoice/payment-direct endpoint enforces this). Without that
        // certificate, card entry has to happen on Monobank's own
        // checkout page. Submitting here just creates the escrow
        // invoice; the actual card entry happens inside the embedded
        // checkout below.
        const payload: CreateEscrowPayload = {
            amount,
            currencyCode,
            projectId,
            clientId,
            freelancerId,
        };

        createEscrow(payload, {
            onSuccess: (escrow: any) => {
                // escrow.pageUrl / escrow.invoiceId come straight through
                // from Monobank's "Створення рахунку" response — wire the
                // backend to pass both fields back unchanged.
                if (escrow?.pageUrl && escrow?.invoiceId) {
                    setCheckoutInvoice({
                        invoiceId: escrow.invoiceId,
                        pageUrl: escrow.pageUrl,
                    });
                } else {
                    onSuccess?.(escrow);
                }
            },
        });
    };

    const handleCheckoutSettled = (escrow: Escrow) => {
        setCheckoutInvoice(null);
        onSuccess?.(escrow);
    };

    return (
        <form
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-20 bg-bg p-6 dark:bg-bg-dark"
        >
            <h2 className="mb-4 text-lg font-semibold text-text dark:text-text-dark">
                {t("paymentMethod")}
            </h2>

            <div className="mb-6 flex flex-col justify-start gap-2 sm:flex-row">
                {PAYMENT_METHODS.map((method) => {
                    const disabled = DISABLED_METHODS.includes(method);

                    return (
                        <button
                            key={method}
                            type="button"
                            disabled={disabled}
                            onClick={() => setActiveMethod(method)}
                            className={`flex flex-1 flex-col items-center gap-2 rounded-20 border px-3 py-4 text-sm font-medium transition-colors
                                ${activeMethod === method
                                    ? "border-success bg-input dark:bg-input-dark"
                                    : "border-border bg-transparent"}
                                ${disabled
                                    ? "cursor-not-allowed opacity-40"
                                    : "text-text hover:bg-input dark:text-text-dark dark:hover:bg-input-dark"}
                            `}
                        >
                            {method === "card" && <CreditCard size={20} />}
                            {method === "apple-pay" && (isDark ? <ApplePayWhite /> : <ApplePay />)}
                            {method === "google-pay" && <GooglePay />}
                            {method === "paypal" && <Paypal />}
                            <span>{t(`methods.${method}`)}</span>
                        </button>
                    );
                })}
            </div>

            {activeMethod === "card" && (
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="cardNumber"
                            className="mb-1 block text-sm text-text dark:text-text-dark"
                        >
                            {t("cardNumber")}
                        </label>
                        <div className="relative">
                            <Controller
                                name="cardNumber"
                                control={control}
                                rules={{
                                    required: t("cardNumberRequired"),
                                    pattern: {
                                        value: /^(\d{4} ){3}\d{4,7}$/,
                                        message: t("cardNumberInvalid"),
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="cardNumber"
                                        inputMode="numeric"
                                        placeholder={t("cardNumberPlaceholder")}
                                        onChange={(e) =>
                                            field.onChange(formatCardNumber(e.target.value))
                                        }
                                        className="w-full rounded-20 border border-border bg-input px-15 py-13 text-text placeholder:text-text-muted focus:outline-none dark:bg-input-dark dark:text-text-dark"
                                    />
                                )}
                            />
                            {/* Card network icons (Visa / Mastercard) — no assets
                                available, drop them in here as small <img>/<svg> */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted">
                                VISA • MC
                            </div>
                        </div>
                        {errors.cardNumber && (
                            <p className="mt-1 text-xs text-error">
                                {errors.cardNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label
                                htmlFor="expirationDate"
                                className="mb-1 block text-sm text-text dark:text-text-dark"
                            >
                                {t("expirationDate")}
                            </label>
                            <Controller
                                name="expirationDate"
                                control={control}
                                rules={{
                                    required: t("expirationRequired"),
                                    pattern: {
                                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                        message: t("expirationInvalid"),
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="expirationDate"
                                        inputMode="numeric"
                                        placeholder={t("expirationPlaceholder")}
                                        onChange={(e) =>
                                            field.onChange(formatExpirationDate(e.target.value))
                                        }
                                        className="w-full rounded-20 border border-border bg-input px-15 py-13 text-text placeholder:text-text-muted focus:outline-none dark:bg-input-dark dark:text-text-dark"
                                    />
                                )}
                            />
                            {errors.expirationDate && (
                                <p className="mt-1 text-xs text-error">
                                    {errors.expirationDate.message}
                                </p>
                            )}
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor="cvv"
                                className="mb-1 block text-sm text-text dark:text-text-dark"
                            >
                                {t("cvv")}
                            </label>
                            <input
                                id="cvv"
                                inputMode="numeric"
                                placeholder={t("cvvPlaceholder")}
                                maxLength={4}
                                {...register("cvv", {
                                    required: t("cvvRequired"),
                                    pattern: {
                                        value: /^\d{3,4}$/,
                                        message: t("cvvInvalid"),
                                    },
                                })}
                                className="w-full rounded-20 border border-border bg-input px-15 py-13 text-text placeholder:text-text-muted focus:outline-none dark:bg-input-dark dark:text-text-dark"
                            />
                            {errors.cvv && (
                                <p className="mt-1 text-xs text-error">
                                    {errors.cvv.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="cardholderName"
                            className="mb-1 block text-sm text-text dark:text-text-dark"
                        >
                            {t("cardholderName")}
                        </label>
                        <input
                            id="cardholderName"
                            placeholder={t("cardholderPlaceholder")}
                            {...register("cardholderName")}
                            className="w-full rounded-20 border border-border bg-input px-15 py-13 text-text placeholder:text-text-muted focus:outline-none dark:bg-input-dark dark:text-text-dark"
                        />
                    </div>
                </div>
            )}

            {/* Card's own submit is intentionally omitted — per the design, a
                single "Submit payment" button lives in the order summary
                sidebar and triggers this form via the `form` attribute
                (see formId prop). Apple Pay / Google Pay keep dedicated
                buttons below since they kick off a different, wallet-specific
                flow, but both submit this same <form>. */}

            {activeMethod === "apple-pay" && (
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-20 bg-bg-dark px-15 py-13 text-white disabled:opacity-60 dark:bg-white dark:text-bg-dark"
                >
                    {/* Requires Apple Pay JS session + aToken flow, see
                        Monobank docs. This button just kicks off invoice
                        creation for now. */}
                    {isPending ? t("processing") : t("payWithApplePay")}
                </button>
            )}

            {activeMethod === "google-pay" && (
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-20 bg-bg-dark px-15 py-13 text-white disabled:opacity-60 dark:bg-white dark:text-bg-dark"
                >
                    {/* Requires Google Pay JS API tokenization, see
                        Monobank docs. This button just kicks off invoice
                        creation for now. */}
                    {isPending ? t("processing") : t("payWithGooglePay")}
                </button>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                <IconLock />
                <span>{t("secureNotice")}</span>
            </div>

            {checkoutInvoice && (
                <CheckoutModal
                    invoiceId={checkoutInvoice.invoiceId}
                    pageUrl={checkoutInvoice.pageUrl}
                    onClose={() => setCheckoutInvoice(null)}
                    onSettled={handleCheckoutSettled}
                />
            )}
        </form>
    );
};

// Embeds Monobank's hosted checkout (pageUrl) in an iframe instead of
// redirecting the whole page. Monobank doesn't document a stance on
// framing that page, so this can't be guaranteed to render everywhere —
// some browsers/banks may block it via X-Frame-Options / frame-ancestors.
// The "open in a new tab" fallback link covers that case; consider
// swapping to a full-page redirect if you see it triggering often.
const CheckoutModal = ({
    invoiceId,
    pageUrl,
    onClose,
    onSettled,
}: {
    invoiceId: string;
    pageUrl: string;
    onClose: () => void;
    onSettled: (escrow: Escrow) => void;
}) => {
    const { t } = useTranslation("payment");
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const onSettledRef = useRef(onSettled);
    onSettledRef.current = onSettled;

    // TODO: implement this hook against your backend (which holds the
    // Monobank X-Token — never call api.monobank.ua's status endpoint
    // from the browser). It should poll GET /invoice/status?invoiceId=…
    // server-side every few seconds and expose the latest status here.
    const { status, escrow } = useInvoiceStatus(invoiceId, {
        // stop polling once the modal is closed
        enabled: true,
        intervalMs: 3000,
    });

    useEffect(() => {
        if (status === "success" && escrow) {
            onSettledRef.current(escrow);
        }
    }, [status, escrow]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative flex h-[min(720px,90vh)] w-full max-w-lg flex-col overflow-hidden rounded-20 bg-bg dark:bg-bg-dark">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <span className="text-sm font-medium text-text dark:text-text-dark">
                        {t("checkout.completeTitle")}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={t("checkout.closeLabel")}
                        className="rounded-full p-1 text-text-muted hover:bg-input dark:hover:bg-input-dark"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="relative flex-1">
                    {!iframeLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
                            {t("checkout.loading")}
                        </div>
                    )}
                    <iframe
                        src={pageUrl}
                        onLoad={() => setIframeLoaded(true)}
                        title="Monobank checkout"
                        className="h-full w-full border-0"
                    />
                </div>

                <a
                    href={pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-xs text-text-muted hover:bg-input dark:hover:bg-input-dark"
                >
                    <ExternalLink size={14} />
                    {t("checkout.troubleLoading")}
                </a>
            </div>
        </div>
    );
};