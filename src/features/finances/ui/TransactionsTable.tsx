import { useTranslation } from "react-i18next";
import { formatDate, formatMoney, formatNumber } from "../model/format";
import { WalletTransaction } from "../model/types";
import HistoryEmpty from "./HistoryEmpty";

interface TransactionsTableProps {
    records: WalletTransaction[];
    /** бонуси — цілі бали, а не долари */
    isBonus?: boolean;
}

export const TransactionsTable = ({ records, isBonus }: TransactionsTableProps) => {
    const { t, i18n } = useTranslation("finances");

    if (records.length === 0) return <HistoryEmpty />;

    const columns = ["type", "amount", "date"] as const;

    const formatAmount = (amount: number) => {
        const sign = amount > 0 ? "+" : "−";
        const value = Math.abs(amount);
        return `${sign}${isBonus ? formatNumber(value, i18n.language) : formatMoney(value, i18n.language)}`;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                    <tr className="bg-black/[0.03] dark:bg-white/[0.04]">
                        {columns.map((column) => (
                            <th
                                key={column}
                                scope="col"
                                className="px-4 py-3 text-sm font-medium text-text-light dark:text-text-muted"
                            >
                                {t(`history.columns.${column}`)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {records.map((record) => (
                        <tr
                            key={record.id}
                            className="border-b border-border last:border-b-0 dark:border-white/10"
                        >
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {t(`history.transactionTypes.${record.type}`)}
                                {record.description && (
                                    <span className="block text-sm text-text-light dark:text-text-muted">
                                        {record.description}
                                    </span>
                                )}
                            </td>
                            <td
                                className={`px-4 py-4 font-medium ${record.amount > 0 ? "text-status-success" : "text-text dark:text-text-dark"
                                    }`}
                            >
                                {formatAmount(record.amount)}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {formatDate(record.createdAt, i18n.language)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
