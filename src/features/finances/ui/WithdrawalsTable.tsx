import StatusBadge from "@/shared/components/ui/StatusBadge";
import { useTranslation } from "react-i18next";
import { formatDate, formatMoney } from "../model/format";
import { WithdrawalRecord } from "../model/types";
import HistoryEmpty from "./HistoryEmpty";

export const WithdrawalsTable = ({ records }: { records: WithdrawalRecord[] }) => {
    const { t, i18n } = useTranslation("finances");

    if (records.length === 0) return <HistoryEmpty />;

    const columns = ["id", "amount", "card", "date", "status"] as const;

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
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
                            <td className="px-4 py-4 text-text dark:text-text-dark" title={record.id}>
                                #{record.id.slice(0, 8).toUpperCase()}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {formatMoney(record.amount, i18n.language)}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {record.maskedCard}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {formatDate(record.createdAt, i18n.language)}
                            </td>
                            <td className="px-4 py-4" title={record.note ?? undefined}>
                                <StatusBadge status={record.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WithdrawalsTable;
