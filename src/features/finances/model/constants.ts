import type { HistoryPeriod, HistoryTab, WithdrawalStatus } from "./types";

export const HISTORY_TABS: HistoryTab[] = [
    "withdrawals",
    "transactions",
    "bonuses",
];

export const HISTORY_PERIODS: HistoryPeriod[] = ["1m", "3m", "6m", "12m"];

/** Поки що до профілю можна прив'язати лише одну картку */
export const MAX_LINKED_CARDS = 1;

export const STATUS_STYLES: Record<WithdrawalStatus, string> = {
    completed: "bg-status-successSoft text-status-success",
    processing: "bg-status-infoSoft text-status-info",
    rejected: "bg-status-dangerSoft text-status-danger",
};

/** Мінімальна сума одного виведення */
export const MIN_WITHDRAW_AMOUNT = 10;

/** Орієнтовний строк обробки запиту, робочих днів */
export const WITHDRAW_PROCESSING_DAYS = "1–3";
