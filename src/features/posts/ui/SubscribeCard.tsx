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
        <section className="relative mt-10 flex flex-col gap-4 rounded-22 bg-main-5 p-6">
            <img src="/images/blog/subscribe.png" alt="" aria-hidden className="pointer-events-none absolute -top-10 right-4 h-[125px] w-[125px] object-contain" />
            <div className="flex flex-col gap-1.5">
                <h3 className="max-w-[146px] text-lg font-semibold leading-[25px]">{t("blog.subscribe.title")}</h3>
                <p className="text-sm leading-[26px]">{t("blog.subscribe.subtitle")}</p>
            </div>
            <form onSubmit={submit} className="flex h-[54px] items-center gap-2 rounded-full border border-main-10 bg-background pl-6 pr-2 focus-within:border-primary">
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    maxLength={254}
                    aria-label={t("blog.subscribe.placeholder")}
                    placeholder={t("blog.subscribe.placeholder")}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                />
                <button
                    type="submit"
                    disabled={subscription.isPending}
                    className="h-[38px] shrink-0 rounded-full bg-gradient px-5 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                    {t("blog.subscribe.button")}
                </button>
            </form>
        </section>
    );
};
