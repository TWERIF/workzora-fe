"use client";

import { PortfolioItem } from "@/features/portfolio/model/types";
import { Triangles } from "@/shared/components/svg/Triangles";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ShowcaseItem from "./ShowcaseItem";

const AUTOPLAY_INTERVAL_MS = 4000;
const CARD_WIDTH = 317;
const CARD_GAP = 16;

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

interface TopWorksProps {
    items: PortfolioItem[];
}

export const TopWorks = ({ items }: TopWorksProps) => {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const trackRef = useRef<HTMLDivElement>(null);
    const isHovering = useRef(false);
    const isSyncingScroll = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = useCallback(
        (index: number) => {
            const track = trackRef.current;
            if (!track || items.length === 0) return;

            const clamped = ((index % items.length) + items.length) % items.length;
            isSyncingScroll.current = true;
            track.scrollTo({
                left: clamped * (CARD_WIDTH + CARD_GAP),
                behavior: "smooth",
            });
            setActiveIndex(clamped);
        },
        [items.length]
    );

    const goNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
    const goPrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);

    // Autoplay — advances one card at a time, pauses while the pointer is over the section.
    useEffect(() => {
        if (items.length <= 1) return;
        const id = setInterval(() => {
            if (!isHovering.current) {
                scrollToIndex(activeIndex + 1);
            }
        }, AUTOPLAY_INTERVAL_MS);
        return () => clearInterval(id);
    }, [activeIndex, items.length, scrollToIndex]);

    // Keeps the dots/active state in sync if the person swipes/drags the track manually.
    const handleScroll = () => {
        if (isSyncingScroll.current) {
            isSyncingScroll.current = false;
            return;
        }
        const track = trackRef.current;
        if (!track || items.length === 0) return;
        const index = Math.round(track.scrollLeft / (CARD_WIDTH + CARD_GAP));
        setActiveIndex(((index % items.length) + items.length) % items.length);
    };

    return (
        <section
            className="relative overflow-hidden py-12"
            onMouseEnter={() => {
                isHovering.current = true;
            }}
            onMouseLeave={() => {
                isHovering.current = false;
            }}
        >
            <div className="pointer-events-none absolute right-0 top-0 opacity-70">
                <Triangles />
            </div>

            <div className="relative z-10 mb-6 flex items-center justify-between px-4 sm:px-8">
                <h2
                    className={cx(
                        "text-2xl font-bold sm:text-3xl",
                        isDark ? "text-text-dark" : "text-text"
                    )}
                >
                    {t("topWorks.title")}
                </h2>

                <div className="hidden items-center gap-3 sm:flex">
                    <ArrowButton direction="prev" onClick={goPrev} />
                    <ArrowButton direction="next" onClick={goNext} />
                </div>
            </div>

            <div
                ref={trackRef}
                onScroll={handleScroll}
                className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
            >
                {items.map((item, i) => (
                    <div key={i} className="shrink-0 snap-start">
                        <ShowcaseItem
                            key={item.id}
                            creator={item?.user!}
                            imageUrl={item.imageUrl}
                            workUrl={`/portfolio/${item.id}`}
                        />
                    </div>
                ))}
            </div>

            {/* Mobile: dots + arrows below the track, matching the reference layout. */}
            <div className="relative z-10 mt-6 flex items-center justify-center gap-4 sm:hidden">
                <ArrowButton direction="prev" onClick={goPrev} />
                <div className="flex items-center gap-1.5">
                    {items.map((_, i) => (
                        <span
                            key={i}
                            className={cx(
                                "h-1.5 rounded-full transition-all duration-300",
                                i === activeIndex
                                    ? "w-6 bg-success"
                                    : cx("w-1.5", isDark ? "bg-white/30" : "bg-black/15")
                            )}
                        />
                    ))}
                </div>
                <ArrowButton direction="next" onClick={goNext} />
            </div>
        </section>
    );
};

function ArrowButton({
    direction,
    onClick,
}: {
    direction: "prev" | "next";
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={direction === "prev" ? "Previous" : "Next"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-white transition-transform hover:scale-105 active:scale-95"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {direction === "prev" ? (
                    <path
                        d="M10 3L5 8l5 5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ) : (
                    <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </button>
    );
}