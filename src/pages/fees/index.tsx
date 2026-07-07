'use client';

import { useMemo, useState, type ReactNode, type SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Fees & Commissions page ("Збори та комісії").
 *
 * Assumes:
 * - Tailwind `darkMode: 'class'` (as configured) — toggling is handled elsewhere
 *   in the app (e.g. a ThemeProvider adding/removing `class="dark"` on <html>).
 * - i18n is wired through `react-i18next` (`useTranslation`). If the project
 *   uses `next-intl` instead, swap `useTranslation('fees')` + `t('key')` for
 *   `useTranslations('fees')` + `t('key')` — the JSON keys are identical.
 * - Translation files: locales/{lng}/fees.json (uk + en provided).
 */

// ---------- Icons (inline, no external icon dep required) ----------

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

const PercentIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
);

const WalletIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3" />
        <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H6a2 2 0 0 1-2-2Z" />
        <circle cx="16" cy="14" r="1.4" fill="currentColor" stroke="none" />
    </svg>
);

const CrownIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <path d="m3 8 4 3 5-6 5 6 4-3-2 10H5Z" />
        <path d="M5 21h14" />
    </svg>
);

const ClockIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
    </svg>
);

const CardIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <line x1="2.5" y1="10" x2="21.5" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
);

const RefundIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v4h4" />
    </svg>
);

const CoinIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 15.2c.5.7 1.4 1.1 2.5 1.1 1.7 0 2.7-.9 2.7-2 0-1.3-1.2-1.7-2.7-2.1-1.5-.4-2.7-.9-2.7-2.2 0-1.1 1-2 2.7-2 1.1 0 2 .4 2.5 1.1" />
        <line x1="12" y1="7" x2="12" y2="17" />
    </svg>
);

const BellIcon = (p: IconProps) => (
    <svg {...iconBase} {...p}>
        <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
);

// ---------- Section shell ----------

interface SectionProps {
    id: string;
    icon: (p: IconProps) => ReactNode;
    title: string;
    children: ReactNode;
}

function Section({ id, icon: Icon, title, children }: SectionProps) {
    return (
        <section
            id={id}
            className="scroll-mt-24 rounded-20 border border-border bg-bg-header p-15 py-13 shadow-input dark:border-border dark:bg-bg-modalDark dark:shadow-input-dark"
        >
            <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient text-white">
                    <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-text dark:text-text-dark">{title}</h2>
                    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-text/80 dark:text-text-dark/80">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Bullet({ children }: { children: ReactNode }) {
    return (
        <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            <span>{children}</span>
        </li>
    );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
    return (
        <div className="rounded-20 border border-border bg-bg px-15 py-13 dark:border-border dark:bg-bg-dark">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-text dark:text-text-dark">{value}</p>
            {note && <p className="mt-0.5 text-xs text-text-muted">{note}</p>}
        </div>
    );
}

// ---------- Page ----------

export default function FeesPage() {
    const { t } = useTranslation('fees');
    const [isPro, setIsPro] = useState(false);

    const baseRate = 8;
    const proDiscount = 2;
    const effectiveRate = isPro ? baseRate - proDiscount : baseRate;

    const navItems = useMemo(
        () => [
            { id: 'how', label: t('fees.nav.how') },
            { id: 'contractor', label: t('fees.nav.contractor') },
            { id: 'pro', label: t('fees.nav.pro') },
            { id: 'autoclose', label: t('fees.nav.autoclose') },
            { id: 'withdrawal', label: t('fees.nav.withdrawal') },
            { id: 'refund', label: t('fees.nav.refund') },
            { id: 'currency', label: t('fees.nav.currency') },
            { id: 'changes', label: t('fees.nav.changes') },
        ],
        [t]
    );

    return (
        <div className="min-h-screen bg-bg dark:bg-bg-dark">
            <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
                {/* Hero */}
                <header className="mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-success">
                        {t('fees.hero.eyebrow')}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-text dark:text-text-dark md:text-4xl">
                        {t('fees.hero.title')}
                    </h1>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-muted">
                        {t('fees.hero.lead')}
                    </p>
                </header>

                {/* Interactive rate strip — the page's one "signature" element */}
                <div className="mb-10 overflow-hidden rounded-20 bg-gradient p-[1px]">
                    <div className="flex flex-col gap-6 rounded-20 bg-bg-header p-15 py-13 dark:bg-bg-modalDark sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-6">
                            <Stat
                                label={t('fees.contractor.rateLabel')}
                                value={`${effectiveRate}%`}
                                note={t('fees.contractor.rateNote')}
                            />
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isPro}
                                onClick={() => setIsPro((v) => !v)}
                                className="flex items-center gap-3 rounded-20 border border-border px-15 py-3 text-left transition-colors hover:bg-bg dark:border-border dark:hover:bg-bg-dark"
                            >
                                <span
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${isPro ? 'bg-success' : 'bg-checkbox'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${isPro ? 'translate-x-5' : 'translate-x-0.5'
                                            }`}
                                    />
                                </span>
                                <span className="text-sm">
                                    <span className="block font-medium text-text dark:text-text-dark">
                                        {t('fees.pro.title')}
                                    </span>
                                    <span className="text-text-muted">
                                        {isPro ? t('fees.pro.discountValue') : t('fees.pro.discountLabel')}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
                    {/* Sticky in-page nav */}
                    <nav className="hidden lg:block">
                        <ul className="sticky top-8 space-y-1 border-l border-border pl-4 text-sm dark:border-border">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className="block rounded py-1 text-text-muted transition-colors hover:text-text dark:hover:text-text-dark"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sections */}
                    <div className="space-y-6">
                        <Section id="how" icon={PercentIcon} title={t('fees.how.title')}>
                            <p>{t('fees.how.body')}</p>
                            <ul className="space-y-1.5">
                                <Bullet>{t('fees.how.customer')}</Bullet>
                                <Bullet>{t('fees.how.contractor')}</Bullet>
                            </ul>
                        </Section>

                        <Section id="contractor" icon={WalletIcon} title={t('fees.contractor.title')}>
                            <p>{t('fees.contractor.body')}</p>
                            <p className="text-text-muted">{t('fees.contractor.future')}</p>
                        </Section>

                        <Section id="pro" icon={CrownIcon} title={t('fees.pro.title')}>
                            <p>{t('fees.pro.body')}</p>
                            <p className="italic text-text-muted">{t('fees.pro.soon')}</p>
                        </Section>

                        <Section id="autoclose" icon={ClockIcon} title={t('fees.autoclose.title')}>
                            <p>{t('fees.autoclose.body')}</p>
                        </Section>

                        <Section id="withdrawal" icon={CardIcon} title={t('fees.withdrawal.title')}>
                            <p>{t('fees.withdrawal.body')}</p>
                            <ul className="space-y-1.5">
                                <Bullet>{t('fees.withdrawal.methods')}</Bullet>
                                <Bullet>
                                    {t('fees.withdrawal.minimum')}: {t('fees.withdrawal.minimumValue')}
                                </Bullet>
                            </ul>
                            <p className="text-text-muted">{t('fees.withdrawal.note')}</p>
                        </Section>

                        <Section id="refund" icon={RefundIcon} title={t('fees.refund.title')}>
                            <p>{t('fees.refund.body')}</p>
                        </Section>

                        <Section id="currency" icon={CoinIcon} title={t('fees.currency.title')}>
                            <p>{t('fees.currency.body')}</p>
                        </Section>

                        <Section id="changes" icon={BellIcon} title={t('fees.changes.title')}>
                            <p>{t('fees.changes.body')}</p>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}