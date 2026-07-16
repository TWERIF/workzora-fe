"use client";

import { Clock } from "@/shared/components/svg/Clock";
import { Setting } from "@/shared/components/svg/Setting";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

/**
 * Small helper so we don't repeat `isDark ? a : b` everywhere.
 */
function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/*  1. "Quality work" — neutral card with an overlapping check badge          */
/* -------------------------------------------------------------------------- */

export function QualityWorkCard() {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={cx(
                "relative overflow-visible rounded-20 p-6",
                isDark ? "bg-bg-modalDark" : "bg-bg"
            )}
        >
            <div className="max-w-[70%]">
                <h3
                    className={cx(
                        "mb-2 text-lg font-bold",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("featureCards.qualityWork.title")}
                </h3>
                <p
                    className={cx(
                        "text-sm leading-relaxed",
                        isDark ? "text-text-dark/70" : "text-text-muted"
                    )}
                >
                    {t("featureCards.qualityWork.description")}
                </p>
            </div>

            {/* 3D check badge, overlapping the top edge of the card. Swap for a real illustration/asset if you have one. */}
            <div className="absolute -top-7 right-0 h-20 w-20 md:top-9 sm:right-0 sm:h-24 sm:w-24">
                <img
                    alt=""
                    src="/images/main/Check.png"
                    className="h-full w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.25)]"
                />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  2. "Be in control" — neutral card, icon + title on the same row           */
/* -------------------------------------------------------------------------- */

export function BeInControlCard() {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={cx("rounded-20 p-6", isDark ? "bg-bg-modalDark" : "bg-bg")}>
            <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-20 bg-success">
                    <Setting className="h-5 w-5 text-white" />
                </div>
                <h3
                    className={cx(
                        "text-lg font-bold",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("featureCards.beInControl.title")}
                </h3>
            </div>
            <p
                className={cx(
                    "text-sm leading-relaxed",
                    isDark ? "text-text-dark/70" : "text-text-muted"
                )}
            >
                {t("featureCards.beInControl.description")}
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  3. "Fast bids" — same family as BeInControlCard, different icon           */
/* -------------------------------------------------------------------------- */

export function FastBidsCard() {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={cx("rounded-20 p-6", isDark ? "bg-bg-modalDark" : "bg-bg")}>
            <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-20 bg-success">
                    <Clock className="h-5 w-5 text-white" />
                </div>
                <h3
                    className={cx(
                        "text-lg font-bold",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("featureCards.fastBids.title")}
                </h3>
            </div>
            <p
                className={cx(
                    "text-sm leading-relaxed",
                    isDark ? "text-text-dark/70" : "text-text-muted"
                )}
            >
                {t("featureCards.fastBids.description")}
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  4. "The best talent" — brand gradient card with floating avatars          */
/* -------------------------------------------------------------------------- */

// Replace these with real imports/URLs of your reviewers' avatars.
const AVATARS = [
    { src: "/images/main/avatars/avatar1.png", className: "right-[10%] top-[10%] h-12 w-12" },
    { src: "/images/main/avatars/avatar2.png", className: "right-0 top-[38%] h-11 w-11" },
    { src: "/images/main/avatars/avatar3.png", className: "right-[32%] top-[62%] h-12 w-12" },
    { src: "/images/main/avatars/avatar4.png", className: "right-[4%] bottom-[6%] h-12 w-12" },
];

export function BestTalentCard() {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={cx(
                "relative min-h-[200px] overflow-hidden rounded-20 p-6",
                isDark ? "bg-card-dark" : "bg-card"
            )}
        >
            {/* decorative arcs */}
            <svg
                className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-30"
                viewBox="0 0 400 300"
                fill="none"
            >
                <circle cx="420" cy="150" r="120" stroke="#7EA310" strokeWidth="1" />
                <circle cx="420" cy="150" r="180" stroke="#7EA310" strokeWidth="1" />
            </svg>

            <div className="relative z-10 max-w-[65%] sm:max-w-[55%]">
                <h3
                    className={cx(
                        "mb-2 text-lg font-bold",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("featureCards.bestTalent.title")}
                </h3>
                <p
                    className={cx(
                        "text-sm leading-relaxed",
                        isDark ? "text-text-dark/80" : "text-text/80"
                    )}
                >
                    {t("featureCards.bestTalent.description")}
                </p>
            </div>

            {AVATARS.map((avatar, i) => (
                <img
                    key={i}
                    src={avatar.src}
                    alt=""
                    className={cx(
                        "absolute rounded-full border-2 object-cover",
                        isDark ? "border-bg-dark" : "border-white",
                        avatar.className
                    )}
                />
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  5. "Make it real with WorkZora" — CTA banner                              */
/* -------------------------------------------------------------------------- */

export function WorkZoraBanner() {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={cx(
                "relative flex flex-col overflow-visible rounded-20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8",
                isDark ? "bg-card-dark" : "bg-card"
            )}
        >
            <div className="relative z-10 order-2 max-w-xs sm:order-1">
                <h2
                    className={cx(
                        "text-2xl font-extrabold leading-tight sm:text-3xl",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("featureCards.banner.titleLine1")}
                    <br />
                    <span className="text-success">
                        {t("featureCards.banner.titleHighlight")}
                    </span>
                </h2>

                {/* Ideally add a dedicated token for this dark green (e.g. colors.brand.dark: "#216B52") in tailwind.config.js */}
                <button
                    type="button"
                    className="mt-6 rounded-full bg-[#216B52] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    {t("featureCards.banner.cta")}
                </button>
            </div>

            <img
                src="/images/main/PhoneMain.png"
                alt=""
                className="pointer-events-none absolute right-0 -top-[3.4rem] z-10 w-40 h-[130%] sm:left-auto sm:right-0 sm:-top-[4.6rem] sm:w-60 sm:translate-x-0"
            />
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper — lays the 5 cards out exactly like the reference design  */
/* -------------------------------------------------------------------------- */

export function HomeFeaturesSection() {
    return (
        <div className="bg-white dark:bg-bg-dark grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr] pb-16 mx-auto px-4">
            <WorkZoraBanner />
            <BestTalentCard />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:col-span-2">
                <FastBidsCard />
                <QualityWorkCard />
                <BeInControlCard />
            </div>
        </div>
    );
}