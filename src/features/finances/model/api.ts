import { $api } from "@/shared/components/http";
import type {
    ExchangeRate,
    NewCardPayload,
    PaymentCard,
    WalletSummary,
    WalletTransaction,
    WithdrawalRecord,
} from "./types";

export const getCards = async (): Promise<PaymentCard[]> => {
    const res = await $api.get<PaymentCard[]>("/payment-data/cards");
    return res.data;
};

export const addCard = async (data: NewCardPayload): Promise<PaymentCard> => {
    const res = await $api.post<PaymentCard>("/payment-data/cards", data);
    return res.data;
};

export const setPrimaryCard = async (id: string): Promise<PaymentCard[]> => {
    const res = await $api.patch<PaymentCard[]>(`/payment-data/cards/${id}/primary`);
    return res.data;
};

export const removeCard = async (id: string): Promise<PaymentCard[]> => {
    const res = await $api.delete<PaymentCard[]>(`/payment-data/cards/${id}`);
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

export const createWithdrawal = async ({ amount, cardId }: { amount: number; cardId?: string }): Promise<WithdrawalRecord> => {
    const res = await $api.post<WithdrawalRecord>("/wallet/withdrawals", { amount, cardId: cardId || undefined });
    return res.data;
};
