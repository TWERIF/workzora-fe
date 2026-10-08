import type { CardBrand, LinkedCard, PaymentCard } from "./types";

const BRANDS: CardBrand[] = ["visa", "mastercard", "amex"];

export const getLast4 = (cardNumber: string) => cardNumber.replace(/\D/g, "").slice(-4);

export const toLinkedCards = (cards: PaymentCard[] | undefined): LinkedCard[] =>
    (cards ?? []).map((card) => ({
        id: card.id,
        brand: BRANDS.includes(card.brand as CardBrand) ? (card.brand as CardBrand) : "unknown",
        last4: getLast4(card.maskedCardNumber),
        expiry: card.expiry ?? undefined,
        isPrimary: card.isPrimary,
    }));
