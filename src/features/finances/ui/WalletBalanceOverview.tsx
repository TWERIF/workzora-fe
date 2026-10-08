import { useExchangeRate, useWalletSummary } from "../model/useWallet";
import BalanceOverview from "./BalanceOverview";

export const WalletBalanceOverview = ({ showMain = true }: { showMain?: boolean }) => {
    const { data: wallet } = useWalletSummary();
    const { data: exchangeRate } = useExchangeRate();

    const balance = wallet?.balance ?? 0;
    const rate = exchangeRate?.rate ?? 0;

    return (
        <BalanceOverview
            balance={{ amount: balance, uahEquivalent: Math.round(balance * rate * 100) / 100 }}
            bonuses={wallet?.bonus ?? 0}
            rate={rate}
            showMain={showMain}
        />
    );
};

export default WalletBalanceOverview;
