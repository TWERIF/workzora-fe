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
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_194px]">
        <MainBalanceCard balance={balance} />
        <BonusBalanceCard bonuses={bonuses} />
        <CurrentRateCard rate={rate} />
    </section>
);

export default BalanceOverview;
