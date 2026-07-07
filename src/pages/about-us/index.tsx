import { useTranslation } from 'react-i18next';

export default function AboutUsPage() {
    const { t } = useTranslation('common');

    return (
        <main id="about-us" className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors duration-300 py-13 px-15 md:py-20">
            <div className="max-w-4xl mx-auto space-y-8">

                <section id="how-it-works" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient text-transparent bg-clip-text leading-tight">
                        {t('About.heroTitle')}
                    </h1>
                    <p className="leading-relaxed mb-6 text-text dark:text-text-dark">
                        {t('About.heroDescription')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div className="p-4 bg-bg dark:bg-bg-dark rounded-20 text-center">
                            <span className="block text-2xl font-bold text-success mb-1">
                                {t('About.heroCardUsdTitle')}
                            </span>
                            <span className="text-sm text-text-muted">
                                {t('About.heroCardUsdText')}
                            </span>
                        </div>
                        <div className="p-4 bg-bg dark:bg-bg-dark rounded-20 text-center">
                            <span className="block text-2xl font-bold text-success mb-1">
                                {t('About.heroCardFeeTitle')}
                            </span>
                            <span className="text-sm text-text-muted">
                                {t('About.heroCardFeeText')}
                            </span>
                        </div>
                        <div className="p-4 bg-bg dark:bg-bg-dark rounded-20 text-center">
                            <span className="block text-2xl font-bold text-success mb-1">
                                {t('About.heroCardEscrowTitle')}
                            </span>
                            <span className="text-sm text-text-muted">
                                {t('About.heroCardEscrowText')}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text dark:text-text-dark">
                        {t('About.whyTitle')}
                    </h2>
                    <div className="space-y-4 leading-relaxed text-text dark:text-text-dark">
                        <p>{t('About.whyP1')}</p>
                        <p>{t('About.whyP2')}</p>
                        <p className="font-semibold text-success">{t('About.whyP3')}</p>
                    </div>
                </section>

                <section id="how-it-works" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">
                        {t('About.howTitle')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-success border-b border-border pb-2">
                                {t('About.clientTitle')}
                            </h3>
                            <ol className="space-y-4">
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">1. {t('About.clientStep1Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.clientStep1Text')}</p>
                                </li>
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">2. {t('About.clientStep2Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.clientStep2Text')}</p>
                                </li>
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">3. {t('About.clientStep3Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.clientStep3Text')}</p>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-success border-b border-border pb-2">
                                {t('About.freelancerTitle')}
                            </h3>
                            <ol className="space-y-4">
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">1. {t('About.freelancerStep1Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.freelancerStep1Text')}</p>
                                </li>
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">2. {t('About.freelancerStep2Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.freelancerStep2Text')}</p>
                                </li>
                                <li className="bg-bg dark:bg-bg-dark p-4 rounded-20">
                                    <span className="font-bold block text-text dark:text-text-dark mb-1">3. {t('About.freelancerStep3Title')}</span>
                                    <p className="text-sm text-text-muted">{t('About.freelancerStep3Text')}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <section id="benefits" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text dark:text-text-dark">
                        {t('About.benefitsTitle')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { id: 1, icon: '🔒' },
                            { id: 2, icon: '💵' },
                            { id: 3, icon: '📋' },
                            { id: 4, icon: '🛡️' },
                            { id: 5, icon: '⚖️' },
                            { id: 6, icon: '💬' },
                        ].map((benefit) => (
                            <div key={benefit.id} className="flex gap-4 p-4 bg-bg dark:bg-bg-dark rounded-20 border border-transparent hover:border-border transition-colors">
                                <span className="text-2xl shrink-0 select-none">{benefit.icon}</span>
                                <div>
                                    <h4 className="font-bold text-text dark:text-text-dark mb-1">
                                        {t(`About.benefit${benefit.id}Title`)}
                                    </h4>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        {t(`About.benefit${benefit.id}Text`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="team" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text dark:text-text-dark">
                        {t('About.teamTitle')}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 border border-border rounded-20 bg-bg dark:bg-bg-dark">
                            <h3 className="font-bold text-lg text-text dark:text-text-dark">{t('About.founderName')}</h3>
                            <span className="text-sm text-success font-medium block mb-2">{t('About.founderRole')}</span>
                            <p className="text-sm text-text-muted leading-relaxed">{t('About.founderDescription')}</p>
                        </div>
                        <div className="p-4 border border-border rounded-20 bg-bg dark:bg-bg-dark">
                            <h3 className="font-bold text-lg text-text dark:text-text-dark">{t('About.developerName')}</h3>
                            <span className="text-sm text-success font-medium block mb-2">{t('About.developerRole')}</span>
                            <p className="text-sm text-text-muted leading-relaxed">{t('About.developerDescription')}</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-text dark:text-text-dark leading-relaxed border-t border-border pt-4">
                        <p>{t('About.teamP1')}</p>
                        <p className="font-semibold text-success">{t('About.teamP2')}</p>
                        <p>{t('About.teamP3')}</p>
                    </div>
                </section>

                <section id="vision" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient text-transparent bg-clip-text">
                        {t('About.visionTitle')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-bg dark:bg-bg-dark rounded-20 border border-border">
                            <h3 className="font-bold text-lg text-success mb-2">
                                {t('About.missionTitle')}
                            </h3>
                            <p className="text-sm leading-relaxed text-text dark:text-text-dark">
                                {t('About.missionText')}
                            </p>
                        </div>
                        <div className="p-4 bg-bg dark:bg-bg-dark rounded-20 border border-border">
                            <h3 className="font-bold text-lg text-success mb-2">
                                {t('About.visionPeriod')}
                            </h3>
                            <p className="text-sm leading-relaxed text-text dark:text-text-dark">
                                {t('About.visionText')}
                            </p>
                        </div>
                    </div>
                </section>

                <section id="contacts" className="bg-bg-header dark:bg-bg-modalDark rounded-20 px-15 py-13 shadow-input dark:shadow-input-dark border border-border text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-text dark:text-text-dark">
                        {t('About.ctaTitle')}
                    </h2>
                    <p className="mb-6 text-text-muted leading-relaxed max-w-xl mx-auto">
                        {t('About.ctaText')}
                    </p>

                    <a
                        href={`mailto:${t('About.email')}`}
                        className="inline-block bg-gradient text-white font-semibold px-8 py-3 rounded-20 shadow-input hover:opacity-90 transition-opacity duration-200"
                    >
                        {t('About.email')}
                    </a>

                    <div className="mt-8 pt-6 border-t border-border text-left text-xs text-text-muted leading-relaxed">
                        {t('About.legal')}
                    </div>
                </section>

            </div>
        </main>
    );
}