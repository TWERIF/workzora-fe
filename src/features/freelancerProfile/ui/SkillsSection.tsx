import ButtonPill from "@/shared/components/ui/Button/ButtonPill";
import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface SkillsSectionProps {
    skills?: string[];
    onSaveSkills?: (skills: string[]) => void;
    isSaving?: boolean;
}

const tagClasses =
    "rounded-full border border-border-light bg-bg-header px-8 py-4 text-base text-text dark:border-white/10 dark:bg-bg-modalDark dark:text-text-dark";

export const SkillsSection = ({ skills = [], onSaveSkills, isSaving }: SkillsSectionProps) => {
    const { t } = useTranslation("common");

    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const startEditing = () => {
        setDraft(skills);
        setInput("");
        setIsEditing(true);
    };

    const addFromInput = () => {
        const next = input
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill && !draft.includes(skill));
        if (next.length) setDraft([...draft, ...new Set(next)]);
        setInput("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addFromInput();
        }
    };

    const save = () => {
        const pending = input.split(",").map((skill) => skill.trim()).filter(Boolean);
        onSaveSkills?.([...new Set([...draft, ...pending])]);
        setIsEditing(false);
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-25 font-bold text-text dark:text-text-dark">
                    {t("profile.skills.title")}
                </h2>
                {onSaveSkills && !isEditing && (
                    <button type="button" onClick={startEditing} className="text-sm text-success">
                        {t("profile.edit.editSkills")}
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-[15px]">
                        {draft.map((skill) => (
                            <span key={skill} className={`flex items-center gap-2 ${tagClasses}`}>
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => setDraft(draft.filter((s) => s !== skill))}
                                    aria-label={t("profile.edit.removeSkill", { skill })}
                                    className="text-text-light hover:text-error"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={addFromInput}
                            autoFocus
                            aria-label={t("profile.edit.skillLabel")}
                            placeholder={t("profile.edit.skillPlaceholder")}
                            className={`min-w-[200px] flex-1 outline-none focus:border-success ${tagClasses}`}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="text-sm text-text-light">
                            {t("profile.edit.cancel")}
                        </button>
                        <ButtonPill onClick={save} disabled={isSaving} text={t("profile.edit.save")} />
                    </div>
                </div>
            ) : skills.length === 0 ? (
                <p className="rounded-3xl bg-surface px-6 py-3 text-sm text-text-light dark:bg-bg-modalDark">
                    {t("profile.noData.skills")}
                </p>
            ) : (
                <div className="flex flex-wrap gap-[15px]">
                    {skills.map((skill) => (
                        <span key={skill} className={tagClasses}>
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};
