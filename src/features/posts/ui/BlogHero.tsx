import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

const POPULAR_SEARCH_KEYS = [
    "blog.popularSearches.freelance",
    "blog.popularSearches.marketing",
    "blog.popularSearches.ai",
    "blog.popularSearches.clients",
] as const;

interface BlogHeroProps {
    onSearch: (term: string) => void;
}

export const BlogHero = ({ onSearch }: BlogHeroProps) => {
    const { t } = useTranslation("common");
    const [term, setTerm] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(term.trim());
    };

    return (
        <section className="flex flex-col items-center gap-6 text-center">
            <span className="rounded-20 bg-gradient px-15 py-1.5 text-sm font-medium text-white">
                {t("blog.badge")}
            </span>

            <h1 className="max-w-2xl text-4xl font-bold text-text dark:text-text-dark sm:text-5xl">
                {t("blog.title.before")}{" "}
                <span className="text-success">{t("blog.title.highlight")}</span>{" "}
                {t("blog.title.after")}
            </h1>

            <p className="max-w-xl text-base text-muted">{t("blog.subtitle")}</p>

            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-xl items-center gap-2 rounded-20 bg-input p-2 shadow-input dark:bg-input-dark dark:shadow-input-dark"
            >
                <Search className="ml-2 h-5 w-5 shrink-0 text-muted" />
                <input
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    type="text"
                    placeholder={t("blog.searchPlaceholder")}
                    className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted dark:text-text-dark"
                />
                <button
                    type="submit"
                    className="shrink-0 rounded-20 bg-gradient px-15 py-2 text-sm font-medium text-white"
                >
                    {t("blog.searchButton")}
                </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
                <span>{t("blog.popularSearchesLabel")}</span>
                {POPULAR_SEARCH_KEYS.map((key) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onSearch(t(key))}
                        className="text-success hover:underline"
                    >
                        {t(key)}
                    </button>
                ))}
            </div>
        </section>
    );
};
