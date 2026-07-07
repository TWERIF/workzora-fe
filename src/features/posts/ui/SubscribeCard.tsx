import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

export const SubscribeCard = () => {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmail("");
    };

    return (
        <div className="flex flex-col gap-4 rounded-20 bg-gradient p-15 py-13 text-white">
            <Mail className="h-8 w-8" />

            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">{t("blog.subscribe.title")}</h3>
                <p className="text-sm text-white/85">{t("blog.subscribe.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    placeholder={t("blog.subscribe.placeholder")}
                    className="w-full rounded-20 bg-white/95 px-15 py-2 text-sm text-text outline-none placeholder:text-muted"
                />
                <button
                    type="submit"
                    className="shrink-0 rounded-20 bg-bg-dark px-15 py-2 text-sm font-medium text-white"
                >
                    {t("blog.subscribe.button")}
                </button>
            </form>
        </div>
    );
};
