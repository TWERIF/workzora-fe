import StatusBadge from "@/shared/components/ui/StatusBadge";
import { useTranslation } from "react-i18next";
import { formatDate, formatMoney, maskedCard } from "../model/format";
import { WithdrawalRecord } from "../model/types";
import ActionsMenu from "./ActionsMenu";


const brandLabel = { visa: "Visa", mastercard: "Mastercard" } as const;

export const WithdrawalsTable = ({ records }: { records: WithdrawalRecord[] }) => {
    const { t, i18n } = useTranslation("finances");

    if (records.length === 0) {
        return (
            <div className="rounded-20 border border-dashed border-border p-10 text-center dark:border-white/15">
                <p className="font-medium text-text dark:text-text-dark">
                    {t("history.empty.title")}
                </p>
                <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                    {t("history.empty.description")}
                </p>
            </div>
        );
    }

    const columns = ["id", "amount", "card", "date", "status", "actions"] as const;

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                    <tr className="bg-black/[0.03] dark:bg-white/[0.04]">
                        {columns.map((column) => (
                            <th
                                key={column}
                                scope="col"
                                className={`px-4 py-3 text-sm font-medium text-text-light dark:text-text-muted ${column === "actions" ? "text-right" : ""
                                    }`}
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
                                #{record.id}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {formatMoney(record.amount, i18n.language)}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {brandLabel[record.brand]} {maskedCard(record.last4)}
                            </td>
                            <td className="px-4 py-4 text-text dark:text-text-dark">
                                {formatDate(record.date, i18n.language)}
                            </td>
                            <td className="px-4 py-4">
                                <StatusBadge status={record.status} />
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex justify-end">
                                    <ActionsMenu
                                        label={t("history.rowActions.label")}
                                        items={[
                                            {
                                                key: "details",
                                                label: t("history.rowActions.details"),
                                                onSelect: () => undefined,
                                            },
                                            {
                                                key: "receipt",
                                                label: t("history.rowActions.receipt"),
                                                onSelect: () => undefined,
                                                disabled: record.status !== "completed",
                                            },
                                            {
                                                key: "repeat",
                                                label: t("history.rowActions.repeat"),
                                                onSelect: () => undefined,
                                            },
                                        ]}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WithdrawalsTable;
