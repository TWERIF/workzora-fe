import { useTranslation } from "react-i18next";

interface SkillsSectionProps {
    skills?: string[];
}

export const SkillsSection = ({ skills = [] }: SkillsSectionProps) => {
    const { t } = useTranslation("common");

    return (
        <section>
            <h2 className="text-base font-semibold text-text dark:text-text-dark">
                {t("profile.skills.title")}
            </h2>

            {skills.length === 0 ? (
                <p className="mt-3 rounded-20 border border-border bg-bg-header px-15 py-13 text-sm text-text-muted dark:bg-bg-modalDark">
                    {t("profile.noData.skills")}
                </p>
            ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-20 border border-border bg-bg-header px-15 py-2 text-sm text-text dark:bg-bg-modalDark dark:text-text-dark"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};