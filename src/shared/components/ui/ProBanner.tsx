import { useTranslation } from "react-i18next";
import InfoIcon from "../svg/InfoIcon";

export const ProBanner = ({ onUpgrade }: { onUpgrade?: () => void }) => {
    const { t } = useTranslation("finances");

    return (
        <section className="flex flex-col gap-4 rounded-20 bg-status-successSoft p-6 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="flex items-center gap-2 font-medium text-status-success">
                    <InfoIcon />
                    {t("pro.title")}
                </p>
                <p className="mt-2 max-w-[62ch] text-sm text-text-light dark:text-text-muted">
                    {t("pro.description")}
                </p>
            </div>

            <button
                type="button"
                onClick={onUpgrade}
                className="flex shrink-0 items-center justify-center gap-2 rounded-[100px] bg-gradient px-6 py-3 font-medium text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                        d="M11.6 2.4c2.2-.3 4 1.5 3.7 3.7-.3 2.4-1.8 4.6-3.8 6l-.4 2.3-3.2-3.2-3.2-3.2 2.3-.4c1.4-2 3.6-3.5 6-3.8Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.3 12.7 3 15M11 6.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                    />
                </svg>
                {t("pro.cta")}
            </button>
        </section>
    );
};

export default ProBanner;
