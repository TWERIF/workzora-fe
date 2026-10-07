import { SKILLS_MAX } from "@/features/auth/model/types";
import { IconClose } from "@/shared/components/svg/UiIcons";
import { useId, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { SettingsSection } from "./SettingsFields";

const SKILL_MAX_LENGTH = 60;

export default function SkillsSection({ skills, onChange }: { skills: string[]; onChange: (skills: string[]) => void }) {
    const { t } = useTranslation("profile");
    const id = useId();
    const [input, setInput] = useState("");
    const isFull = skills.length >= SKILLS_MAX;

    const add = () => {
        const skill = input.trim().slice(0, SKILL_MAX_LENGTH);
        if (!skill || isFull) return;
        if (!skills.some((item) => item.toLowerCase() === skill.toLowerCase())) onChange([...skills, skill]);
        setInput("");
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            add();
        }
        if (event.key === "Backspace" && !input && skills.length) onChange(skills.slice(0, -1));
    };

    return (
        <SettingsSection id="skills" title={t("skills.title")} description={t("skills.description")}>
            <div className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-sm leading-[26px]">
                    {t("skills.label")}
                </label>
                <input
                    id={id}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={add}
                    disabled={isFull}
                    maxLength={SKILL_MAX_LENGTH}
                    placeholder={t("skills.placeholder")}
                    className="h-[50px] w-full rounded-20 border border-main-10 bg-background px-15 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary disabled:opacity-60"
                />
                <span className="text-xs text-main-50">
                    {isFull ? t("skills.limit", { max: SKILLS_MAX }) : t("skills.hint", { max: SKILLS_MAX })}
                </span>
            </div>

            {skills.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <li key={skill} className="flex h-[50px] max-w-full items-center gap-3 rounded-full border border-main-10 px-5 text-sm">
                            <span className="truncate">{skill}</span>
                            <button
                                type="button"
                                onClick={() => onChange(skills.filter((item) => item !== skill))}
                                aria-label={t("skills.remove", { skill })}
                                className="shrink-0 text-status-danger transition-opacity hover:opacity-70"
                            >
                                <IconClose size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </SettingsSection>
    );
}
