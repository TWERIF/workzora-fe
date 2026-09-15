import { Balance } from "../model/types";
import BonusBalanceCard from "./BonusBalanceCard";
import CurrentRateCard from "./CurrentRateCard";
import MainBalanceCard from "./MainBalanceCard";

interface BalanceOverviewProps {
    balance: Balance;
    bonuses: number;
    rate: number;
}

export const BalanceOverview = ({ balance, bonuses, rate }: BalanceOverviewProps) => (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr]">
        <MainBalanceCard balance={balance} />
        <BonusBalanceCard bonuses={bonuses} />
        <CurrentRateCard rate={rate} />
    </section>
);

export default BalanceOverview;
