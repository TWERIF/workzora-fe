import {
    ArrowUpRight,
    Ban,
    Handshake,
    History,
    MessageCircleWarning,
    ShieldAlert,
    Users,
    type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useTranslation } from "react-i18next";

/**
 * "Кодекс поведінки" / Code of Conduct page.
 *
 * - Fully driven by i18n (namespace: "codeOfConduct"). Drop the provided
 *   uk/en JSON files into your i18n resources under that namespace.
 * - Light/dark theme via Tailwind's `class` strategy — every color comes
 *   from the design tokens already defined in tailwind.config.js
 *   (bg / text / border / success / error / gradient).
 * - The left rail is a scroll-spy table of contents whose vertical line
 *   fills with the brand gradient as the reader progresses — a small,
 *   functional signature for a page whose only job is "help me find and
 *   read this section."
 */

type SectionKey = "general" | "contacts" | "prohibited" | "sanctions" | "report" | "changes";
type Accent = "success" | "error";
type SectionRefsMap = Record<string, HTMLElement | null>;

const SECTION_ICONS: Record<SectionKey, LucideIcon> = {
    general: Users,
    contacts: Handshake,
    prohibited: Ban,
    sanctions: ShieldAlert,
    report: MessageCircleWarning,
    changes: History,
};

const SECTION_KEYS: SectionKey[] = [
    "general",
    "contacts",
    "prohibited",
    "sanctions",
    "report",
    "changes",
];

interface CodeOfConductProps {
    lastUpdated?: string;
    supportHref?: string;
}

/**
 * i18next's `returnObjects: true` should give back an array, but if the
 * "codeOfConduct" namespace hasn't finished loading yet (async backends,
 * SSR hydration, missing key, etc.) it falls back to returning the key
 * itself as a string. Guard against that so `.map` never blows up.
 */
function toArray(value: unknown): string[] {
    return Array.isArray(value) ? (value as string[]) : [];
}

export default function CodeOfConduct({
    lastUpdated = "01.07.2026",
    supportHref = "/support",
}: CodeOfConductProps) {
    const { t } = useTranslation("codeOfConduct");
    const [activeSection, setActiveSection] = useState<SectionKey>(SECTION_KEYS[0]);
    const [progress, setProgress] = useState(0);
    const sectionRefs = useRef<SectionRefsMap>({});
    const articleRef = useRef<HTMLElement | null>(null);

    // Scroll-spy: highlight the section currently in view.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const key = (entry.target as HTMLElement).dataset.section as SectionKey | undefined;
                        if (key) setActiveSection(key);
                    }
                });
            },
            { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Reading progress for the rail's gradient line.
    useEffect(() => {
        const onScroll = () => {
            const el = articleRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.6;
            const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
            setProgress(Math.min(100, (scrolled / Math.max(total, 1)) * 100));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = (key: SectionKey) => {
        sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-bg text-text dark:bg-bg-dark dark:text-text-dark">
            {/* Header */}
            <header className="border-b border-border/60 bg-bg-header dark:border-white/10 dark:bg-bg-dark">
                <div className="mx-auto max-w-5xl px-6 py-13 sm:px-15">
                    <div className="h-1 w-14 rounded-full bg-gradient" aria-hidden="true" />
                    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {t("meta.title")}
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        {t("meta.updated")}: {lastUpdated}
                    </p>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/90 dark:text-text-dark/90">
                        {t("meta.intro")}
                    </p>
                </div>
            </header>

            <div className="mx-auto max-w-5xl gap-10 px-6 py-10 sm:px-15 lg:flex lg:items-start">
                {/* Mobile TOC */}
                <details className="mb-8 rounded-20 border border-border/60 bg-bg-header p-4 shadow-input dark:border-white/10 dark:bg-bg-modalDark dark:shadow-input-dark lg:hidden">
                    <summary className="cursor-pointer select-none text-sm font-medium">
                        {t("toc.label")}
                    </summary>
                    <nav className="mt-3 flex flex-col gap-1">
                        {SECTION_KEYS.map((key) => (
                            <button
                                key={key}
                                onClick={() => scrollToSection(key)}
                                className="rounded-lg px-2 py-2 text-left text-sm text-text/80 hover:bg-black/5 dark:text-text-dark/80 dark:hover:bg-white/5"
                            >
                                {t(`sections.${key}.title`)}
                            </button>
                        ))}
                    </nav>
                </details>

                {/* Desktop rail */}
                <nav aria-label={t("toc.label")} className="sticky top-10 hidden w-64 shrink-0 lg:block">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        {t("toc.label")}
                    </p>
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-0 h-full w-px bg-border/70 dark:bg-white/10" />
                        <div
                            className="absolute left-0 top-0 w-px bg-gradient transition-[height] duration-150"
                            style={{ height: `${progress}%` }}
                            aria-hidden="true"
                        />
                        <ul className="flex flex-col gap-1">
                            {SECTION_KEYS.map((key) => {
                                const isActive = activeSection === key;
                                return (
                                    <li key={key}>
                                        <button
                                            onClick={() => scrollToSection(key)}
                                            className={[
                                                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success",
                                                isActive
                                                    ? "font-medium text-text dark:text-text-dark"
                                                    : "text-muted hover:text-text dark:hover:text-text-dark",
                                            ].join(" ")}
                                            aria-current={isActive ? "true" : undefined}
                                        >
                                            {t(`sections.${key}.title`)}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* Article */}
                <article ref={articleRef} className="min-w-0 flex-1 space-y-10">
                    <Section
                        id="general"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.general.eyebrow")}
                        title={t("sections.general.title")}
                        Icon={SECTION_ICONS.general}
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.general.lead")}</p>
                        <BulletList items={toArray(t("sections.general.items", { returnObjects: true }))} />
                    </Section>

                    <Section
                        id="contacts"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.contacts.eyebrow")}
                        title={t("sections.contacts.title")}
                        Icon={SECTION_ICONS.contacts}
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.contacts.body1")}</p>
                        <p className="mt-4 text-text/90 dark:text-text-dark/90">{t("sections.contacts.body2")}</p>
                    </Section>

                    <Section
                        id="prohibited"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.prohibited.eyebrow")}
                        title={t("sections.prohibited.title")}
                        Icon={SECTION_ICONS.prohibited}
                        accent="error"
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.prohibited.lead")}</p>
                        <BulletList
                            items={toArray(t("sections.prohibited.items", { returnObjects: true }))}
                            accent="error"
                        />
                    </Section>

                    <Section
                        id="sanctions"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.sanctions.eyebrow")}
                        title={t("sections.sanctions.title")}
                        Icon={SECTION_ICONS.sanctions}
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.sanctions.lead")}</p>
                        <BulletList items={toArray(t("sections.sanctions.items", { returnObjects: true }))} />
                        <p className="mt-4 text-sm text-muted">{t("sections.sanctions.note")}</p>
                    </Section>

                    <Section
                        id="report"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.report.eyebrow")}
                        title={t("sections.report.title")}
                        Icon={SECTION_ICONS.report}
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.report.body")}</p>
                        <a
                            href={supportHref}
                            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
                        >
                            {t("sections.report.cta")}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </Section>

                    <Section
                        id="changes"
                        sectionRefs={sectionRefs}
                        eyebrow={t("sections.changes.eyebrow")}
                        title={t("sections.changes.title")}
                        Icon={SECTION_ICONS.changes}
                    >
                        <p className="text-text/90 dark:text-text-dark/90">{t("sections.changes.body")}</p>
                    </Section>
                </article>
            </div>
        </div>
    );
}

interface SectionProps {
    id: SectionKey;
    sectionRefs: RefObject<SectionRefsMap>;
    eyebrow: string;
    title: string;
    Icon: LucideIcon;
    accent?: Accent;
    children: ReactNode;
}

function Section({ id, sectionRefs, eyebrow, title, Icon, accent = "success", children }: SectionProps) {
    const accentClasses = accent === "error" ? "bg-error/10 text-error" : "bg-success/10 text-success";

    return (
        <section
            id={id}
            data-section={id}
            ref={(el: HTMLElement | null) => {
                sectionRefs.current[id] = el;
            }}
            className="scroll-mt-10 rounded-20 border border-border/60 bg-bg-header p-6 shadow-input dark:border-white/10 dark:bg-bg-modalDark dark:shadow-input-dark sm:p-8"
        >
            <div className="flex items-start gap-4">
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accentClasses}`}
                    aria-hidden="true"
                >
                    <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{eyebrow}</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
                </div>
            </div>
            <div className="mt-5 pl-14 text-[15px] leading-relaxed sm:pl-14">{children}</div>
        </section>
    );
}

interface BulletListProps {
    items: string[];
    accent?: Accent;
}

function BulletList({ items, accent = "success" }: BulletListProps) {
    const dotClass = accent === "error" ? "bg-error" : "bg-success";
    const safeItems = Array.isArray(items) ? items : [];
    return (
        <ul className="mt-3 space-y-2.5">
            {safeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
                    <span className="text-text/90 dark:text-text-dark/90">{item}</span>
                </li>
            ))}
        </ul>
    );
}