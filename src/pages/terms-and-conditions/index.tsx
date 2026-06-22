import { useTranslation } from 'next-i18next';

export default function TermsPage() {
    const { t } = useTranslation('common');

    const sectionKeys = Array.from({ length: 16 }, (_, i) => String(i + 1));

    return (
        <main className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors duration-200 ease-in-out py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-10 text-center relative pb-6">
                    <h1 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
                        {t('terms.title', 'Terms of Service для WorkZora.com')}
                    </h1>
                    <p className="mt-3 text-sm text-text-muted">
                        {t('terms.lastUpdated', 'Останнє оновлення: [08.06.2026]')}
                    </p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient rounded-full" />
                </div>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">

                    <aside className="hidden lg:block lg:col-span-1 sticky top-6 bg-bg-header dark:bg-bg-modalDark shadow-input dark:shadow-input-dark rounded-20 p-5 border border-border/20">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 px-2">
                            Зміст документа
                        </h2>
                        <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 subtle-scrollbar">
                            {sectionKeys.map((key) => (
                                <a
                                    key={key}
                                    href={`#section-${key}`}
                                    className="block px-2 py-1.5 text-xs font-medium rounded-md hover:bg-bg dark:hover:bg-bg-dark hover:text-success transition-all border-l-2 border-transparent hover:border-success text-ellipsis overflow-hidden whitespace-nowrap"
                                >
                                    {t(`terms.sections.${key}.title`).split('. ')[1] || t(`terms.sections.${key}.title`)}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    <div className="lg:col-span-3 space-y-6">

                        <div className="bg-bg-header dark:bg-bg-modalDark shadow-input dark:shadow-input-dark rounded-20 p-6 sm:p-8 border border-border/10">
                            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                                <p className="font-medium">{t('terms.intro1')}</p>
                                <p className="text-text-muted dark:text-text-dark/80 bg-bg/50 dark:bg-bg-dark/40 rounded-lg p-4 border-l-4 border-success">
                                    {t('terms.intro2')}
                                </p>
                            </div>
                        </div>

                        {sectionKeys.map((key) => {
                            const title = t(`terms.sections.${key}.title`);
                            const content = t(`terms.sections.${key}.content`);

                            const textLines = content.split('\n');

                            return (
                                <section
                                    key={key}
                                    id={`section-${key}`}
                                    className="scroll-mt-6 bg-bg-header dark:bg-bg-modalDark shadow-input dark:shadow-input-dark rounded-20 border border-border/10 overflow-hidden"
                                >
                                    <div className="bg-bg/40 dark:bg-bg-dark/40 border-b border-border/10 py-13 px-15 flex items-center justify-between">
                                        <h3 className="font-bold text-sm sm:text-base text-text dark:text-text-dark tracking-wide">
                                            {title}
                                        </h3>
                                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-success/10 text-success">
                                            § {key}
                                        </span>
                                    </div>

                                    <div className="p-6 sm:p-8 space-y-3 text-sm sm:text-base leading-relaxed text-text/90 dark:text-text-dark/90">
                                        {textLines.map((line, idx) => {
                                            if (line.trim().startsWith('-')) {
                                                return (
                                                    <ul key={idx} className="list-disc pl-5 my-1 space-y-1">
                                                        <li className="pl-1">
                                                            {line.replace(/^-\s*/, '')}
                                                        </li>
                                                    </ul>
                                                );
                                            }

                                            return (
                                                <p key={idx} className="block">
                                                    {line}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })}

                        <div className="text-center text-xs text-text-muted pt-4">
                            © {new Date().getFullYear()} WorkZora.com. Всі права захищено.
                        </div>

                    </div>
                </div>
            </div>

            <style jsx global>{`
        .subtle-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .subtle-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .subtle-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(160, 161, 163, 0.3);
          border-radius: 10px;
        }
      `}</style>
        </main>
    );
}