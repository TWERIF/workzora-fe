import { useExchangeRate, useWalletSummary } from "../model/useWallet";
import BalanceOverview from "./BalanceOverview";

/** Картки балансу, бонусів і курсу з реальними даними гаманця та курсом Monobank */
export const WalletBalanceOverview = () => {
    const { data: wallet } = useWalletSummary();
    const { data: exchangeRate } = useExchangeRate();

    const balance = wallet?.balance ?? 0;
    // до завантаження курсу показуємо 0, а не вигадане значення
    const rate = exchangeRate?.rate ?? 0;

    return (
        <BalanceOverview
            balance={{ amount: balance, uahEquivalent: Math.round(balance * rate * 100) / 100 }}
            bonuses={wallet?.bonus ?? 0}
            rate={rate}
        />
    );
};

export default WalletBalanceOverview;
