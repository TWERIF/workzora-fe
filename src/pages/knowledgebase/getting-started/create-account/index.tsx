


import IconSearch from "@/shared/components/svg/IconSearch";
import { Calendar } from "@/shared/components/svg/Knowledgebase/Calendar";
import { Clock } from "@/shared/components/svg/Knowledgebase/Clock";
import { Team } from "@/shared/components/svg/Knowledgebase/Team";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTranslation } from "react-i18next";


export default function CreateAccountPage() {
    const { t } = useTranslation("createAccount");

    const popularSearchKeys = [
        "payments",
        "profile",
        "project",
        "arbitration",
        "proposals",
    ] as const;

    const tipKeys = ["tip1", "tip2", "tip3", "tip4", "tip5"] as const;

    return (
        <main className="bg-white dark:bg-bg-dark py-28">
            <section className="px-4 text-center">
                <span className="inline-block rounded-full bg-success px-5 py-2 text-[13px] font-medium text-text-dark">
                    {t("badge")}
                </span>

                <h1 className="mx-auto mt-6 max-w-4xl text-[32px] font-extrabold leading-tight text-text dark:text-text-dark md:text-[48px]">
                    {t("title")}
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                    {t("description")}
                </p>

                <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-input p-2 pl-5 shadow-card dark:bg-input-dark dark:shadow-card-dark">
                    <IconSearch className="h-5 w-5 shrink-0 text-success" />
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        className="flex-1 bg-transparent outline-none text-text dark:text-text-dark placeholder:text-text-light dark:placeholder:text-text-muted text-[14px] md:text-[15px]"
                    />
                    <ButtonGradient
                        text={t("searchButton")}
                        className="!px-[28px] !py-[12px] !rounded-full"
                    />
                </div>

                <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[14px]">
                    <span className="text-text-muted">{t("popularSearchesLabel")}</span>
                    {popularSearchKeys.map((key) => (
                        <a key={key} href="#" className="text-success hover:underline">
                            {t(`popularSearches.${key}`)}
                        </a>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-20">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <article className="space-y-8 lg:col-span-2">
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step1.title")}
                            </h2>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step1.text")}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step2.title")}
                            </h2>
                            <p className="mt-3 text-[15px] font-semibold text-text dark:text-text-dark">
                                {t("steps.step2.intro")}
                            </p>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-start gap-2 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                                    {t("steps.step2.client")}
                                </li>
                                <li className="flex items-start gap-2 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                                    {t("steps.step2.freelancer")}
                                </li>
                            </ul>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step2.note")}
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step3.title")}
                            </h2>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step3.text")}
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step4.title")}
                            </h2>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step4.text1")}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step4.text2")}
                            </p>
                        </div>

                        {/* Step 5 */}
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step5.title")}
                            </h2>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step5.text1")}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step5.text2")}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step5.text3")}
                            </p>
                        </div>

                        {/* Step 6 */}
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("steps.step6.title")}
                            </h2>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step6.text1")}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step6.text2")}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("steps.step6.text3")}
                            </p>
                        </div>

                        {/* Tips */}
                        <div>
                            <h2 className="text-[22px] font-bold text-text dark:text-text-dark md:text-[26px]">
                                {t("tipsTitle")}
                            </h2>
                            <ul className="mt-3 space-y-2">
                                {tipKeys.map((key) => (
                                    <li
                                        key={key}
                                        className="flex items-start gap-2 text-[15px] leading-relaxed text-text-light dark:text-text-muted"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                                        {t(`tips.${key}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Need help box */}
                        <div className="rounded-20 bg-status-successSoft p-6">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 shrink-0 bg-black dark:bg-white" />
                                <span className="text-[15px] font-semibold text-success">
                                    {t("needHelp.title")}
                                </span>
                            </div>
                            <p className="mt-2 text-[14px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("needHelp.text")}
                            </p>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Details card */}
                        <div className="rounded-20 bg-bg p-5 dark:bg-bg-modalDark">
                            <h3 className="text-[15px] font-semibold text-text dark:text-text-dark">
                                {t("details.title")}
                            </h3>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between rounded-[10px] bg-white px-4 py-3 dark:bg-input-dark">
                                    <div className="flex items-center gap-2 text-[13px] text-text-muted">
                                        <Clock className="h-4 w-4" />
                                        {t("details.timeToReadLabel")}
                                    </div>
                                    <span className="text-[13px] font-semibold text-text dark:text-text-dark">
                                        {t("details.timeToReadValue")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-[10px] bg-white px-4 py-3 dark:bg-input-dark">
                                    <div className="flex items-center gap-2 text-[13px] text-text-muted">
                                        <Calendar className="h-4 w-4" />
                                        {t("details.updatedLabel")}
                                    </div>
                                    <span className="text-[13px] font-semibold text-text dark:text-text-dark">
                                        {t("details.updatedValue")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-20 bg-bg p-5 dark:bg-bg-modalDark">
                            <div className="flex items-center gap-3">
                                <Team />
                                <div>
                                    <p className="text-[14px] font-semibold text-text dark:text-text-dark">
                                        {t("team.name")}
                                    </p>
                                    <p className="text-[12px] text-text-muted">{t("team.role")}</p>
                                </div>
                            </div>
                            <p className="mt-4 text-[13px] leading-relaxed text-text-light dark:text-text-muted">
                                {t("team.text")}
                            </p>
                        </div>

                        <div className="rounded-20 bg-bg p-5 text-center dark:bg-bg-modalDark">
                            <p className="text-[15px] font-semibold text-text dark:text-text-dark">
                                {t("feedback.question")}
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-4 text-[24px]">
                                <button type="button" aria-label="not-helpful">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="36" height="36" fill="url(#pattern0_3380_21226)" />
                                        <defs>
                                            <pattern id="pattern0_3380_21226" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_3380_21226" transform="scale(0.0138889)" />
                                            </pattern>
                                            <image id="image0_3380_21226" width="72" height="72" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>

                                </button>
                                <button type="button" aria-label="neutral">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="36" height="36" fill="url(#pattern0_3380_21240)" />
                                        <defs>
                                            <pattern id="pattern0_3380_21240" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_3380_21240" transform="scale(0.0138889)" />
                                            </pattern>
                                            <image id="image0_3380_21240" width="72" height="72" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>

                                </button>
                                <button type="button" aria-label="helpful">
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="36" height="36" fill="url(#pattern0_3380_21236)" />
                                        <defs>
                                            <pattern id="pattern0_3380_21236" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0_3380_21236" transform="scale(0.0138889)" />
                                            </pattern>
                                            <image id="image0_3380_21236" width="72" height="72" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale ?? "en", ["createAccount"])),
//         },
//     };
// };