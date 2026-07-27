import { OrderSummary } from "@/features/payment/ui/OrderSummary";
import { PaymentForm } from "@/features/payment/ui/PaymentForm";
import { SecureTrusted } from "@/features/payment/ui/SecureTrusted";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PAYMENT_FORM_ID = "payment-form";

export default function Payment() {
    const { t } = useTranslation("payment");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // TODO: replace with real data — projectId/clientId/freelancerId and the
    // invoice's amount/currencyCode should come from route params / a query
    // for the project being paid for, not be hardcoded here.
    const projectId = "";
    const clientId = "";
    const freelancerId = "";
    const projectBudget = 850;
    const currencyCode = 840; 

    return (
        <section className="p-8 flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
            <div className="flex-1">
                <h1 className="font-bold text-[25px] text-text dark:text-text-dark">
                    {t("title")}
                </h1>
                <h2 className="text-[14px] text-text-muted">{t("description")}</h2>

                <div className="mt-6 w-full">
                    <PaymentForm
                        formId={PAYMENT_FORM_ID}
                        amount={projectBudget}
                        currencyCode={currencyCode}
                        projectId={projectId}
                        clientId={clientId}
                        freelancerId={freelancerId}
                        onPendingChange={setIsSubmitting}
                    />
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 lg:max-w-xs">
                <OrderSummary projectBudget={projectBudget} />
                <SecureTrusted />

                <div className="flex gap-3">
                    <ButtonGradient
                        type="button"
                        text={t("cancel")}
                        className="flex-1  !px-15 !py-3 font-medium"
                        filled={false}
                    />
                    <ButtonGradient
                        type="submit"
                        form={PAYMENT_FORM_ID}
                        disabled={isSubmitting}
                        className="flex-1 !px-15 !py-3 font-medium text-white disabled:opacity-60"
                        text={isSubmitting ? t("processing") : t("submitPayment")}
                    />
                </div>
            </div>
        </section>
    );
}