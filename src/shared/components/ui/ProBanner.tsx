import { useTranslation } from "react-i18next";
import InfoOutlineIcon from "../svg/Profile/InfoOutlineIcon";
import ButtonPill from "./Button/ButtonPill";

interface ProBannerProps {
    title?: string;
    description?: string;
    cta?: string;
    href?: string;
    onUpgrade?: () => void;
}

export const ProBanner = ({ title, description, cta, href, onUpgrade }: ProBannerProps) => {
    const { t } = useTranslation("finances");

    return (
        <section className="flex flex-col gap-3 rounded-22 border border-success/20 bg-surface-success p-6 dark:bg-status-successSoft md:flex-row md:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <p className="flex items-center gap-2 text-base font-semibold text-success">
                    <InfoOutlineIcon className="shrink-0" />
                    {title ?? t("pro.title")}
                </p>
                <p className="text-sm text-text-light dark:text-text-muted">
                    {description ?? t("pro.description")}
                </p>
            </div>

            <ButtonPill
                href={href}
                onClick={onUpgrade}
                text={cta ?? t("pro.cta")}
                icon={
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
                }
            />
        </section>
    );
};

export default ProBanner;
