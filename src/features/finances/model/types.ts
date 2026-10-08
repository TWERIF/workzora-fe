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
    maskedCard: string;
    status: WithdrawalStatus;
    note: string | null;
    createdAt: string;
    processedAt: string | null;
}

export type TransactionType = "project_payout" | "withdrawal" | "withdrawal_refund" | "bonus";

export interface WalletTransaction {
    id: string;
    type: TransactionType;
    kind: "balance" | "bonus";
    amount: number;
    projectId: string | null;
    withdrawalId: string | null;
    description: string | null;
    createdAt: string;
}

export interface WalletSummary {
    balance: number;
    bonus: number;
    pendingWithdrawals: number;
}

export interface ExchangeRate {
    currency: "USD";
    rate: number;
    updatedAt: string;
}

export interface Balance {
    amount: number;
    uahEquivalent: number;
}

export type CardBrand = "visa" | "mastercard" | "amex" | "unknown";

export interface NewCardPayload {
    cardNumber: string;
    expiry?: string;
}

export interface PaymentCard {
    id: string;
    userId: string;
    maskedCardNumber: string;
    brand: string;
    expiry: string | null;
    isPrimary: boolean;
    createdAt: string;
}
