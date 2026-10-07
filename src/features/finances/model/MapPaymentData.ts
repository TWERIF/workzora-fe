import type { LinkedCard } from "@/features/finances/model/types";
import type { PaymentData } from "./types";

export const getLast4 = (cardNumber: string) => cardNumber.replace(/\D/g, "").slice(-4);

export const toLinkedCards = (paymentData: PaymentData | null | undefined): LinkedCard[] => {
    if (!paymentData?.maskedCardNumber) return [];

    return [
        {
            id: paymentData.id,
            brand: "unknown",
            last4: getLast4(paymentData.maskedCardNumber),
            isPrimary: true,
        },
    ];
};