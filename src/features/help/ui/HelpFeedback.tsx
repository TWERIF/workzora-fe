import { useTranslation } from "react-i18next";
import type { HelpReaction } from "../model/types";
import { useHelpFeedback } from "../model/useHelp";

const OPTIONS: { reaction: HelpReaction; emoji: string }[] = [
    { reaction: "no", emoji: "🙁" },
    { reaction: "maybe", emoji: "🤔" },
    { reaction: "yes", emoji: "🤩" },
];

export default function HelpFeedback({ articleId }: { articleId: string }) {
    const { t } = useTranslation("help");
    const { reaction, send } = useHelpFeedback(articleId);

    return (
        <section className="flex flex-col items-center gap-3 rounded-[24px] bg-main-5 p-5 text-center">
            <h2 className="text-base font-semibold">{reaction ? t("article.thanks") : t("article.feedback")}</h2>
            <div className="flex gap-3">
                {OPTIONS.map((option) => (
                    <button
                        key={option.reaction}
                        type="button"
                        disabled={Boolean(reaction)}
                        onClick={() => send(option.reaction)}
                        aria-label={t(`article.reactions.${option.reaction}`)}
                        aria-pressed={reaction === option.reaction}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-2xl transition-transform enabled:hover:scale-110 ${
                            reaction === option.reaction ? "bg-primary-10 ring-2 ring-primary" : reaction ? "opacity-40" : "bg-background"
                        }`}
                    >
                        {option.emoji}
                    </button>
                ))}
            </div>
        </section>
    );
}
