import type { LinkedCard } from "@/features/finances/model/types";
import type { PaymentData } from "./types";

export const getLast4 = (cardNumber: string) => cardNumber.replace(/\D/g, "").slice(-4);

/**
 * Приводить відповідь /payment-data до вигляду, з яким працює секція карток.
 * Бек тримає лише одну картку на користувача, тож повертаємо масив із 0 або 1 елемента.
 * Повний номер бек не віддає — лише maskedCardNumber ("•••• •••• •••• 1234"),
 * тож платіжну систему за BIN визначити не можна.
 */
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