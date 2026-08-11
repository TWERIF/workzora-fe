import { User } from "@/features/auth/model/types";
import { useTranslation } from "react-i18next";
import { StatRing } from "./Statring";


interface AboutSectionProps {
    user: User | null | undefined;
}

export const AboutSection = ({ user }: AboutSectionProps) => {
    const { t } = useTranslation("common");

    const hasRating = user?.ratings != null;
    const hasRate = user?.rate != null;
    const hasRates = user?.rates != null;

    return (
        <section>
            <h2 className="text-base font-semibold text-text dark:text-text-dark">
                {t("profile.about.title")}
            </h2>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <StatRing
                    label={t("profile.about.successfulProjects")}
                    sublabel={t("profile.noData.successfulProjects")}
                    centerText={hasRates ? `${user!.rates}` : "–"}
                    progress={hasRates ? user!.rates : 0}
                />
                <StatRing
                    label={t("profile.about.rating")}
                    sublabel={hasRating ? t("profile.about.allTime") : t("profile.noData.rating")}
                    centerText={hasRating ? `${user!.ratings}` : "–"}
                    progress={hasRating ? user!.ratings / 5 : 0}
                />
                <StatRing
                    label={t("profile.about.hourRate")}
                    sublabel={hasRate ? t("profile.about.perHour") : t("profile.noData.hourRate")}
                    centerText={hasRate ? `${user!.rate}$` : "–"}
                    progress={hasRate ? 1 : 0}
                />
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-muted">
                {t("profile.noData.bio")}
            </p>
        </section>
    );
};