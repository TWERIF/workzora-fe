import type { LinkedCard } from "@/features/finances/model/types";
import type { CardBrand, PaymentData } from "./types";

/** Визначає платіжну систему за першими цифрами номера */
export const detectCardBrand = (cardNumber: string): CardBrand => {
    const digits = cardNumber.replace(/\D/g, "");

    if (/^4/.test(digits)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";

    return "unknown";
};

export const getLast4 = (cardNumber: string) => cardNumber.replace(/\D/g, "").slice(-4);

/**
 * Приводить відповідь /payment-data до вигляду, з яким працює секція карток.
 * Бек тримає лише одну картку на користувача, тож повертаємо масив із 0 або 1 елемента.
 */
export const toLinkedCards = (paymentData: PaymentData | null | undefined): LinkedCard[] => {
    if (!paymentData?.cardNumber) return [];

    return [
        {
            id: paymentData.id,
            brand: detectCardBrand(paymentData.cardNumber),
            last4: getLast4(paymentData.cardNumber),
        },
    ];
};