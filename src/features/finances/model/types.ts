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

/** GET /wallet/withdrawals — суми в USD */
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

/** GET /wallet/transactions — USD для балансу, бали для бонусів; amount зі знаком */
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

/** GET /wallet/me */
export interface WalletSummary {
    balance: number;
    bonus: number;
    pendingWithdrawals: number;
}

/** GET /wallet/rate — курс USD→UAH з Monobank */
export interface ExchangeRate {
    currency: "USD";
    rate: number;
    updatedAt: string;
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