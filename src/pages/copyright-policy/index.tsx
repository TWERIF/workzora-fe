import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const SUPPORT_EMAIL = "admin@workzora.com";
const CONTACTS_PATH = "/contacts";

const SECTION_KEYS = [
    "protection",
    "whereToSend",
    "review",
    "counterNotice",
    "repeatViolations",
    "changes",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

export default function CopyrightPolicyPage() {
    const { t } = useTranslation("copyrightPolicy");
    const [activeSection, setActiveSection] = useState<SectionKey>(SECTION_KEYS[0]);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const sections = useMemo(
        () =>
            SECTION_KEYS.map((key) => ({
                key,
                title: t(`sections.${key}.title`),
                body: t(`sections.${key}.body`, { email: SUPPORT_EMAIL }),
                body2:
                    key === "review" ? t(`sections.${key}.body2`) : undefined,
            })),
        [t]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible?.target.id) {
                    setActiveSection(visible.target.id as SectionKey);
                }
            },
            { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
        );

        SECTION_KEYS.forEach((key) => {
            const el = sectionRefs.current[key];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-bg text-text dark:bg-bg-dark dark:text-text-dark">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                {/* Header */}
                <header className="mb-14 max-w-2xl">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-[3px] w-10 rounded-full bg-gradient" />
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted dark:text-text-dark/60">
                            {t("eyebrow")}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {t("title")}
                    </h1>
                    <p className="mt-5 leading-relaxed text-text/75 dark:text-text-dark/75">
                        {t("intro")}
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
                    {/* TOC */}
                    <aside className="order-first lg:order-none">
                        <nav className="lg:sticky lg:top-24">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted dark:text-text-dark/50">
                                {t("toc.heading")}
                            </p>
                            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                                {sections.map((section, index) => {
                                    const isActive = activeSection === section.key;
                                    return (
                                        <li key={section.key} className="shrink-0 lg:shrink">
                                            <a
                                                href={`#${section.key}`}
                                                className={[
                                                    "flex items-center gap-2.5 whitespace-nowrap rounded-20 border px-15 py-13 text-sm transition-colors lg:whitespace-normal",
                                                    isActive
                                                        ? "border-transparent bg-gradient text-white"
                                                        : "border-border text-text/70 hover:border-text/30 dark:border-border dark:text-text-dark/70 dark:hover:border-text-dark/40",
                                                ].join(" ")}
                                            >
                                                <span
                                                    className={[
                                                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                                                        isActive
                                                            ? "bg-white/25 text-white"
                                                            : "bg-checkbox/40 text-text/70 dark:bg-white/10 dark:text-text-dark/70",
                                                    ].join(" ")}
                                                >
                                                    {index + 1}
                                                </span>
                                                {section.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div>
                        {sections.map((section, index) => (
                            <section
                                key={section.key}
                                id={section.key}
                                ref={(el) => {
                                    sectionRefs.current[section.key] = el;
                                }}
                                className="scroll-mt-24 border-b border-border pb-10 mb-10 last:mb-0 last:border-none last:pb-0 dark:border-border"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient text-sm font-semibold text-white">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-xl font-semibold">{section.title}</h2>
                                </div>

                                <p className="leading-relaxed text-text/80 dark:text-text-dark/80">
                                    {section.key === "whereToSend" ? (
                                        <Trans
                                            before={section.body.split(SUPPORT_EMAIL)[0]}
                                            after={section.body.split(SUPPORT_EMAIL)[1]}
                                            email={SUPPORT_EMAIL}
                                        />
                                    ) : (
                                        section.body
                                    )}
                                </p>

                                {section.body2 && (
                                    <p className="mt-4 leading-relaxed text-text/80 dark:text-text-dark/80">
                                        {section.body2}
                                    </p>
                                )}
                            </section>
                        ))}

                        {/* Contact card */}
                        <div className="mt-4 rounded-20 border border-border bg-input p-15 dark:border-border dark:bg-input-dark">
                            <h3 className="text-base font-semibold">
                                {t("contactCard.heading")}
                            </h3>
                            <p className="mt-2 text-sm text-text/70 dark:text-text-dark/70">
                                {t("contactCard.body")}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a
                                    href={`mailto:${SUPPORT_EMAIL}`}
                                    className="rounded-20 bg-gradient px-15 py-13 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                >
                                    {t("contactCard.emailCta", { email: SUPPORT_EMAIL })}
                                </a>
                                <a
                                    href={CONTACTS_PATH}
                                    className="rounded-20 border border-border px-15 py-13 text-sm font-semibold text-text transition-colors hover:border-text/40 dark:border-border dark:text-text-dark dark:hover:border-text-dark/40"
                                >
                                    {t("contactCard.contactsCta")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/**
 * Small helper to render a translated sentence that contains a mailto link
 * in the middle, without breaking i18n interpolation or copyright-safe
 * plain-text storage in the JSON files.
 */
function Trans({
    before,
    after,
    email,
}: {
    before: string;
    after: string;
    email: string;
}) {
    return (
        <>
            {before}
            <a
                href={`mailto:${email}`}
                className="font-medium text-success underline decoration-success/40 underline-offset-2 hover:decoration-success"
            >
                {email}
            </a>
            {after}
        </>
    );
}