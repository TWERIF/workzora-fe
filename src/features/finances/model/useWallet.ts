import { useQuery } from "@tanstack/react-query";
import { getExchangeRate, getTransactions, getWalletSummary, getWithdrawals } from "./api";
import type { HistoryPeriod } from "./types";

export const walletKeys = {
    all: ["wallet"] as const,
    summary: () => ["wallet", "summary"] as const,
    rate: () => ["wallet", "rate"] as const,
    withdrawals: (period: HistoryPeriod) => ["wallet", "withdrawals", period] as const,
    transactions: (kind: "balance" | "bonus", period: HistoryPeriod) =>
        ["wallet", "transactions", kind, period] as const,
};

const PERIOD_MONTHS: Record<HistoryPeriod, number> = { "1m": 1, "3m": 3, "6m": 6, "12m": 12 };

/** Початок періоду історії у форматі ISO, який розуміє бек (?from=) */
const periodStart = (period: HistoryPeriod) => {
    const date = new Date();
    date.setMonth(date.getMonth() - PERIOD_MONTHS[period]);
    return date.toISOString();
};

export const useWalletSummary = (enabled = true) =>
    useQuery({
        queryKey: walletKeys.summary(),
        queryFn: getWalletSummary,
        enabled,
    });

/** Курс оновлюється на беку раз на 5 хв (обмеження Monobank), частіше питати сенсу немає */
export const useExchangeRate = () =>
    useQuery({
        queryKey: walletKeys.rate(),
        queryFn: getExchangeRate,
        staleTime: 5 * 60_000,
    });

export const useWithdrawals = (period: HistoryPeriod, enabled = true) =>
    useQuery({
        queryKey: walletKeys.withdrawals(period),
        queryFn: () => getWithdrawals(periodStart(period)),
        enabled,
    });

export const useTransactions = (kind: "balance" | "bonus", period: HistoryPeriod, enabled = true) =>
    useQuery({
        queryKey: walletKeys.transactions(kind, period),
        queryFn: () => getTransactions(kind, periodStart(period)),
        enabled,
    });
