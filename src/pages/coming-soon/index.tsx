import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ComingSoonPage() {
    const { t } = useTranslation("comingSoon");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-text dark:bg-bg-dark dark:text-text-dark">
            <div className="relative mb-10 flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32">
                <div
                    className="absolute inset-0 rounded-full bg-gradient opacity-90 animate-[pulse_3.5s_ease-in-out_infinite]"
                    aria-hidden="true"
                />
                <div className="absolute inset-[3px] rounded-full bg-bg dark:bg-bg-dark" aria-hidden="true" />
                <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="relative h-12 w-12 text-[#7EA310] dark:text-[#9BC93A]"
                    aria-hidden="true"
                >
                    <path
                        d="M24 40V22"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M24 22C24 22 12 22 12 10C24 10 24 22 24 22Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M24 26C24 26 36 26 36 16C24 16 24 26 24 26Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h1 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("title")}
            </h1>

            <p className="mt-3 max-w-md text-base text-text-muted dark:text-text-muted">
                {t("description")}
            </p>

            <Link
                href="/"
                className="mt-13 rounded-20 border border-border px-15 py-13 text-sm font-medium text-text transition-colors hover:border-transparent hover:bg-gradient hover:text-white dark:border-border dark:text-text-dark"
            >
                {t("back")}
            </Link>
        </main>
    );
}