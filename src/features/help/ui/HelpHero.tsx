import IconSearch from "@/shared/components/svg/IconSearch";
import { useRouter } from "next/router";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

const POPULAR = ["payments", "profile", "project", "arbitration", "proposals"] as const;

interface HelpHeroProps {
    title: string;
    subtitle?: string;
}

export default function HelpHero({ title, subtitle }: HelpHeroProps) {
    const { t } = useTranslation("help");
    const router = useRouter();
    const current = typeof router.query.search === "string" ? router.query.search : "";
    const [term, setTerm] = useState(current);

    useEffect(() => setTerm(current), [current]);

    const go = (value: string) => {
        const search = value.trim();
        router.push(search ? { pathname: "/knowledgebase", query: { search } } : "/knowledgebase");
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        go(term);
    };

    return (
        <section className="flex flex-col items-center gap-5 text-center">
            <span className="rounded-full bg-primary px-4 py-2 text-xs text-white">{t("badge")}</span>
            <h1 className="max-w-4xl break-words text-3xl font-bold leading-tight sm:text-5xl lg:text-[55px] lg:leading-[82px]">{title}</h1>
            {subtitle && <p className="max-w-[564px] break-words text-base leading-relaxed sm:text-lg sm:leading-[27px]">{subtitle}</p>}
            <form onSubmit={submit} role="search" className="flex min-h-[61px] w-full max-w-[831px] items-center gap-3 rounded-full border border-main-10 bg-background py-2 pl-6 pr-2 focus-within:border-primary">
                <IconSearch className="h-5 w-5 shrink-0 text-primary" />
                <input
                    type="search"
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    aria-label={t("searchPlaceholder")}
                    placeholder={t("searchPlaceholder")}
                    className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-main-50"
                />
                <button type="submit" className="h-[45px] shrink-0 rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90">
                    {t("searchButton")}
                </button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-base">
                <span className="text-main-50">{t("popularSearches")}:</span>
                {POPULAR.map((key) => (
                    <button key={key} type="button" onClick={() => go(t(`popular.${key}`))} className="text-primary hover:underline">
                        {t(`popular.${key}`)}
                    </button>
                ))}
            </div>
        </section>
    );
}
