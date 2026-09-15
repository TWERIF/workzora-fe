import InfoIcon from "@/shared/components/svg/InfoIcon";
import { useTranslation } from "react-i18next";

export const VerificationNotice = ({ isVerified }: { isVerified: boolean }) => {
    const { t } = useTranslation("finances");
    const state = isVerified ? "verified" : "unverified";

    return (
        <div
            className={`rounded-20 p-5 ${isVerified ? "bg-status-successSoft" : "bg-status-dangerSoft"
                }`}
        >
            <p
                className={`flex items-center gap-2 font-medium ${isVerified ? "text-status-success" : "text-status-danger"
                    }`}
            >
                <InfoIcon />
                {t(`cards.${state}.title`)}
            </p>
            <p className="mt-2 text-sm text-text-light dark:text-text-muted">
                {t(`cards.${state}.description`)}
            </p>
        </div>
    );
};

export default VerificationNotice;
