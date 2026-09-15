export type WithdrawalStatus = "completed" | "processing" | "rejected";

export type HistoryTab = "withdrawals" | "transactions" | "bonuses";

export type HistoryPeriod = "1m" | "3m" | "6m" | "12m";

export interface LinkedCard {
    id?: string;
    brand: CardBrand;
    last4: string;
    expiry?: string;
    isPrimary?: boolean;
}

export interface WithdrawalRecord {
    id: string;
    amount: number;
    brand: CardBrand;
    last4: string;
    date: string;
    status: WithdrawalStatus;
}

export interface Balance {
    amount: number;
    uahEquivalent: number;
}

export type CardBrand = "visa" | "mastercard" | "unknown";

export interface CardPayload {
    cardNumber: string;
}

export interface PaymentData {
    id: string;
    userId: string;
    cardNumberEncrypted: string;
    cardNumberIv: string;
    cardNumberAuthTag: string;
    maskedCardNumber: string;
    updatedAt: Date;
    createdAt: Date;
}