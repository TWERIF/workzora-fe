import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useBlogSubscription } from "../model/usePosts";

export const SubscribeCard = () => {
    const { t } = useTranslation("common");
    const { locale = "en" } = useRouter();
    const [email, setEmail] = useState("");
    const subscription = useBlogSubscription();

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        subscription.mutate(
            { email: email.trim(), locale: locale === "uk" ? "uk" : "en" },
            {
                onSuccess: () => {
                    setEmail("");
                    toast.success(t("blog.subscribe.success"));
                },
                onError: () => toast.error(t("blog.subscribe.error")),
            },
        );
    };

    return (
        <section className="relative flex flex-col gap-3 overflow-hidden rounded-[24px] bg-main-5 p-5">
            <Mail aria-hidden className="absolute -right-2 -top-2 h-20 w-20 rotate-12 text-primary/15" />
            <h3 className="max-w-[70%] text-base font-semibold">{t("blog.subscribe.title")}</h3>
            <p className="text-xs leading-5">{t("blog.subscribe.subtitle")}</p>
            <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-main-10 bg-background py-1 pl-4 pr-1 focus-within:border-primary">
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    maxLength={254}
                    aria-label={t("blog.subscribe.placeholder")}
                    placeholder={t("blog.subscribe.placeholder")}
                    className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                />
                <button
                    type="submit"
                    disabled={subscription.isPending}
                    className="shrink-0 rounded-full bg-gradient px-4 py-2 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {t("blog.subscribe.button")}
                </button>
            </form>
        </section>
    );
};
