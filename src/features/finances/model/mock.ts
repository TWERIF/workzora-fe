import type { Balance, WithdrawalRecord } from "./types";

/**
 * Тимчасові дані для блоків, у яких ще немає ендпоінтів.
 * Картки більше не мокаються — вони приходять з /payment-data.
 */

export const mockMainBalance: Balance = { amount: 235, uahEquivalent: 17450 };

export const mockBonusBalance = 120;

export const mockRate = 200.45;

export const mockAvailableToWithdraw = 425.8;

export const mockWithdrawals: WithdrawalRecord[] = [
    { id: "WD-2048", amount: 250, brand: "visa", last4: "2489", date: "2026-05-28", status: "completed" },
    { id: "WD-2047", amount: 120, brand: "mastercard", last4: "9142", date: "2026-05-14", status: "completed" },
    { id: "WD-2046", amount: 75, brand: "visa", last4: "2489", date: "2026-04-30", status: "processing" },
    { id: "WD-2045", amount: 200, brand: "mastercard", last4: "1268", date: "2026-04-12", status: "completed" },
    { id: "WD-2044", amount: 80, brand: "mastercard", last4: "9142", date: "2026-03-28", status: "rejected" },
    { id: "WD-2043", amount: 150, brand: "visa", last4: "2489", date: "2026-03-10", status: "completed" },
];