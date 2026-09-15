import { STATUS_STYLES } from "@/features/finances/model/constants";
import { WithdrawalStatus } from "@/features/finances/model/types";
import { useTranslation } from "react-i18next";

export const StatusBadge = ({ status }: { status: WithdrawalStatus }) => {
    const { t } = useTranslation("finances");

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-sm ${STATUS_STYLES[status]}`}
        >
            {t(`history.status.${status}`)}
        </span>
    );
};

export default StatusBadge;
