import type { PublicProfile } from "@/features/auth/model/types";
import { StatRing } from "@/features/freelancerProfile/ui/Statring";
import { useTranslation } from "react-i18next";

interface ClientAboutSectionProps {
    user: PublicProfile;
    hiresFor: string[];
}

export default function ClientAboutSection({ user, hiresFor }: ClientAboutSectionProps) {
    const { t, i18n } = useTranslation("common");
    const posted = user.stats?.posted ?? 0;
    const completed = user.stats?.completedAsClient ?? 0;
    const spent = user.stats?.spent ?? 0;
    const money = new Intl.NumberFormat(i18n.language, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(spent);

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-25 font-bold">{t("profile.client.aboutTitle")}</h2>

            <div className="flex flex-col gap-3 md:flex-row">
                <StatRing label={t("profile.client.posted")} sublabel={t("profile.about.allTime")} centerText={`${posted}`} progress={posted ? 1 : 0} />
                <StatRing
                    label={t("profile.client.completed")}
                    sublabel={t("profile.about.allTime")}
                    centerText={`${completed}/${posted}`}
                    progress={posted ? completed / posted : 0}
                    color="star"
                />
                <StatRing label={t("profile.client.spent")} sublabel={t("profile.about.allTime")} centerText={money} progress={spent ? 1 : 0} color="secondary" />
            </div>

            <p className="whitespace-pre-line break-words text-base">{user.bio || t("profile.noData.bio")}</p>

            {hiresFor.length > 0 && (
                <div>
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold">{t("profile.client.hiringPreferences")}</h3>
                        <span className="text-sm text-main-50">{t("profile.client.usuallyHires")}</span>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {hiresFor.map((category) => (
                            <li key={category} className="rounded-full border border-main-10 px-6 py-3 text-sm">
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
