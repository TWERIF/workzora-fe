import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

const POPULAR_SEARCH_KEYS = [
    "blog.popularSearches.freelance",
    "blog.popularSearches.marketing",
    "blog.popularSearches.ai",
    "blog.popularSearches.clients",
] as const;

export const BlogHero = ({ onSearch }: { onSearch: (term: string) => void }) => {
    const { t } = useTranslation("common");
    const [term, setTerm] = useState("");

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(term.trim());
    };

    const pick = (value: string) => {
        setTerm(value);
        onSearch(value);
    };

    return (
        <section className="flex flex-col items-center gap-5 text-center">
            <span className="rounded-full bg-primary px-4 py-1.5 text-xs text-white">{t("blog.badge")}</span>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-[56px]">
                {t("blog.title.before")} <span className="text-primary">{t("blog.title.highlight")}</span> {t("blog.title.after")}
            </h1>

            <p className="max-w-xl text-base">{t("blog.subtitle")}</p>

            <form onSubmit={submit} role="search" className="flex w-full max-w-[840px] items-center gap-3 rounded-full border border-main-10 bg-background py-1.5 pl-5 pr-1.5 focus-within:border-primary">
                <Search className="h-5 w-5 shrink-0 text-primary" />
                <input
                    value={term}
                    onChange={(event) => {
                        setTerm(event.target.value);
                        if (!event.target.value) onSearch("");
                    }}
                    type="search"
                    aria-label={t("blog.searchPlaceholder")}
                    placeholder={t("blog.searchPlaceholder")}
                    className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                />
                <button type="submit" className="shrink-0 rounded-full bg-gradient px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90">
                    {t("blog.searchButton")}
                </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
                <span className="text-main-50">{t("blog.popularSearchesLabel")}</span>
                {POPULAR_SEARCH_KEYS.map((key) => (
                    <button key={key} type="button" onClick={() => pick(t(key))} className="text-primary hover:underline">
                        {t(key)}
                    </button>
                ))}
            </div>
        </section>
    );
};
