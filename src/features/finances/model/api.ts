import { $api } from "@/shared/components/http";
import type {
    CardPayload,
    ExchangeRate,
    PaymentData,
    WalletSummary,
    WalletTransaction,
    WithdrawalRecord,
} from "./types";

export const getPaymentData = async (userId: string): Promise<PaymentData | null> => {
    const res = await $api.get(`/payment-data/${userId}`);

    // Бек повертає порожню відповідь, якщо картку ще не додавали
    return res.data ?? null;
};

export const createPaymentData = async (
    data: CardPayload,
): Promise<PaymentData> => {
    const res = await $api.post("/payment-data", data);

    return res.data;
};

export const updatePaymentData = async (
    data: CardPayload,
): Promise<PaymentData> => {
    const res = await $api.put("/payment-data", data);

    return res.data;
};

export const getWalletSummary = async (): Promise<WalletSummary> => {
    const res = await $api.get("/wallet/me");
    return res.data;
};

export const getExchangeRate = async (): Promise<ExchangeRate> => {
    const res = await $api.get("/wallet/rate");
    return res.data;
};

export const getWithdrawals = async (from?: string): Promise<WithdrawalRecord[]> => {
    const res = await $api.get("/wallet/withdrawals", { params: { from } });
    return res.data;
};

export const getTransactions = async (
    kind: "balance" | "bonus",
    from?: string,
): Promise<WalletTransaction[]> => {
    const res = await $api.get("/wallet/transactions", { params: { kind, from } });
    return res.data;
};

export const createWithdrawal = async (amount: number): Promise<WithdrawalRecord> => {
    const res = await $api.post("/wallet/withdrawals", { amount });
    return res.data;
};
