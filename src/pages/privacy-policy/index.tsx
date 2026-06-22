'use client'

import { useTranslation } from 'react-i18next'; 

export default function PrivacyPolicyPage() {
    const { t } = useTranslation('common'); 

    return (
        <main className="min-h-screen bg-bg dark:bg-bg-dark py-10 px-15 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto bg-bg-header dark:bg-bg-modalDark rounded-20 p-8 sm:p-12 shadow-input dark:shadow-input-dark transition-all duration-300">

                <article className="prose prose-slate dark:prose-invert max-w-none text-text dark:text-text-dark prose-headings:text-text prose-headings:dark:text-text-dark prose-a:text-success prose-a:no-underline hover:prose-a:underline">

                    <h1>{t('privacy.title')}</h1>
                    <p className="text-text-muted dark:text-text-muted text-sm">
                        {t('privacy.lastUpdated')} <strong>{t('privacy.date')}</strong>
                    </p>

                    <p>{t('privacy.intro1')}</p>
                    <p>{t('privacy.intro2')}</p>

                    <h2>{t('privacy.sec1_title')}</h2>
                    <p>{t('privacy.sec1_p1')}</p>
                    <p>{t('privacy.sec1_p2')}</p>
                    <p>{t('privacy.sec1_p3')}</p>
                    <ul>
                        <li><strong>{t('privacy.sec1_li1_bold')}</strong>{t('privacy.sec1_li1_text')}</li>
                        <li><strong>{t('privacy.sec1_li2_bold')}</strong>{t('privacy.sec1_li2_text')}</li>
                        <li><strong>{t('privacy.sec1_li3_bold')}</strong>{t('privacy.sec1_li3_text')}</li>
                    </ul>
                    <p>{t('privacy.sec1_p4')}</p>
                    <p>{t('privacy.sec1_p5')}</p>
                    <blockquote>
                        <strong>{t('privacy.sec1_operator_bold')}</strong>{t('privacy.sec1_operator_text')}
                        <br />
                        <strong>{t('privacy.sec1_email_bold')}</strong> <a href="mailto:workzora.partners@gmail.com">workzora.partners@gmail.com</a>
                    </blockquote>

                    <h2>{t('privacy.sec2_title')}</h2>
                    <p>{t('privacy.sec2_p1')}</p>

                    <h3>{t('privacy.sec2_sub1_title')}</h3>
                    <p>{t('privacy.sec2_sub1_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec2_sub1_li1')}</li>
                        <li>{t('privacy.sec2_sub1_li2')}</li>
                        <li>{t('privacy.sec2_sub1_li3')}</li>
                        <li>{t('privacy.sec2_sub1_li4')}</li>
                        <li>{t('privacy.sec2_sub1_li5')}</li>
                    </ul>

                    <h3>{t('privacy.sec2_sub2_title')}</h3>
                    <p>{t('privacy.sec2_sub2_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec2_sub2_li1')}</li>
                        <li>{t('privacy.sec2_sub2_li2')}</li>
                        <li>{t('privacy.sec2_sub2_li3')}</li>
                        <li>{t('privacy.sec2_sub2_li4')}</li>
                        <li>{t('privacy.sec2_sub2_li5')}</li>
                        <li>{t('privacy.sec2_sub2_li6')}</li>
                    </ul>

                    <h3>{t('privacy.sec2_sub3_title')}</h3>
                    <p>{t('privacy.sec2_sub3_p1')}</p>

                    <h2>{t('privacy.sec3_title')}</h2>
                    <p>{t('privacy.sec3_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec3_li1')}</li>
                        <li>{t('privacy.sec3_li2')}</li>
                        <li>{t('privacy.sec3_li3')}</li>
                        <li>{t('privacy.sec3_li4')}</li>
                        <li>{t('privacy.sec3_li5')}</li>
                        <li>{t('privacy.sec3_li6')}</li>
                        <li>{t('privacy.sec3_li7')}</li>
                    </ul>
                    <p><strong>{t('privacy.sec3_p2')}</strong></p>

                    <h2>{t('privacy.sec4_title')}</h2>
                    <p>{t('privacy.sec4_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec4_li1')}</li>
                        <li>{t('privacy.sec4_li2')}</li>
                        <li>{t('privacy.sec4_li3')}</li>
                        <li>{t('privacy.sec4_li4')}</li>
                    </ul>
                    <p>{t('privacy.sec4_p2')}</p>

                    <h2>{t('privacy.sec5_title')}</h2>
                    <p>{t('privacy.sec5_p1')}</p>

                    <h2>{t('privacy.sec6_title')}</h2>
                    <p>{t('privacy.sec6_p1')}</p>

                    <h2>{t('privacy.sec7_title')}</h2>
                    <p>{t('privacy.sec7_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec7_li1')}</li>
                        <li>{t('privacy.sec7_li2')}</li>
                        <li>{t('privacy.sec7_li3')}</li>
                    </ul>

                    <h2>{t('privacy.sec8_title')}</h2>
                    <p>{t('privacy.sec8_p1')}</p>

                    <h2>{t('privacy.sec9_title')}</h2>
                    <p>{t('privacy.sec9_p1')}</p>
                    <ul>
                        <li>{t('privacy.sec9_li1')}</li>
                        <li>{t('privacy.sec9_li2')}</li>
                        <li>{t('privacy.sec9_li3')}</li>
                        <li>{t('privacy.sec9_li4')}</li>
                    </ul>
                    <p>{t('privacy.sec9_contact')} <a href="mailto:workzora.partners@gmail.com">workzora.partners@gmail.com</a>.</p>

                    <h2>{t('privacy.sec10_title')}</h2>
                    <p>{t('privacy.sec10_p1')}</p>

                    <h2>{t('privacy.sec11_title')}</h2>
                    <p>{t('privacy.sec11_p1')}</p>

                    <h2>{t('privacy.sec12_title')}</h2>
                    <p>{t('privacy.sec12_p1')}</p>

                    <h2>{t('privacy.sec13_title')}</h2>
                    <p>{t('privacy.sec13_p1')}</p>

                    <h2>{t('privacy.sec14_title')}</h2>
                    <p>{t('privacy.sec14_p1')}</p>

                    <h2>{t('privacy.sec15_title')}</h2>
                    <p>{t('privacy.sec15_p1')}</p>
                    <p>
                        <strong>{t('privacy.sec15_name')}</strong><br />
                        Email: <a href="mailto:workzora.partners@gmail.com">workzora.partners@gmail.com</a>
                    </p>

                </article>
            </div>
        </main>
    );
}