import { useTranslation } from "react-i18next";

interface AddCardButtonProps {
    onClick: () => void;
    /** Ліміт прив'язаних карток вичерпано */
    isLimitReached: boolean;
}

export const AddCardButton = ({ onClick, isLimitReached }: AddCardButtonProps) => {
    const { t } = useTranslation("finances");

    return (
        <div className="flex flex-col items-start gap-1 sm:items-end">
            <button
                type="button"
                onClick={onClick}
                disabled={isLimitReached}
                title={isLimitReached ? t("cards.limitReached") : undefined}
                className="flex items-center gap-2 rounded-[100px] bg-gradient px-6 py-3 font-medium text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span aria-hidden="true" className="text-lg leading-none">
                    +
                </span>
                {t("cards.add")}
            </button>

            {/* {isLimitReached && (
                <p className="text-xs text-text-light dark:text-text-muted">
                    {t("cards.limitReached")}
                </p>
            )} */}
        </div>
    );
};

export default AddCardButton;
