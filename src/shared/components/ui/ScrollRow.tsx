import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ScrollRowProps {
    children: ReactNode;
    className?: string;
    wrapperClassName?: string;
    role?: string;
    as?: "div" | "nav";
}

const ACTIVE = '[aria-selected="true"], [aria-current]:not([aria-current="false"]), [aria-pressed="true"]';

export default function ScrollRow({ children, className = "", wrapperClassName = "", role, as: Tag = "div" }: ScrollRowProps) {
    const { t } = useTranslation("common");
    const track = useRef<HTMLDivElement | null>(null);
    const [edges, setEdges] = useState({ start: false, end: false });

    const update = useCallback(() => {
        const el = track.current;
        if (!el) return;
        setEdges({ start: el.scrollLeft > 2, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    }, []);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        Array.from(el.children).forEach((child) => observer.observe(child));
        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || el.scrollWidth <= el.clientWidth) return;
            const canScroll = event.deltaY > 0 ? el.scrollLeft + el.clientWidth < el.scrollWidth - 1 : el.scrollLeft > 0;
            if (!canScroll) return;
            event.preventDefault();
            el.scrollLeft += event.deltaY;
        };
        el.addEventListener("scroll", update, { passive: true });
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            observer.disconnect();
            el.removeEventListener("scroll", update);
            el.removeEventListener("wheel", onWheel);
        };
    }, [update]);

    const lastActive = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = track.current;
        const active = el?.querySelector<HTMLElement>(ACTIVE) ?? null;
        if (!el || !active || active === lastActive.current) return;
        lastActive.current = active;
        const left = active.offsetLeft - el.offsetLeft;
        if (left < el.scrollLeft || left + active.offsetWidth > el.scrollLeft + el.clientWidth) {
            el.scrollTo({ left: left - (el.clientWidth - active.offsetWidth) / 2, behavior: "smooth" });
        }
    });

    const scrollBy = (direction: 1 | -1) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.7, behavior: "smooth" });
    const arrow = "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background text-primary shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-opacity hover:opacity-90";

    return (
        <Tag className={`relative min-w-0 ${wrapperClassName}`}>
            <div ref={track} role={role} className={`overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
                {children}
            </div>
            {edges.start && (
                <button type="button" onClick={() => scrollBy(-1)} aria-label={t("scroll.left")} className={`${arrow} left-1`}>
                    <ChevronLeft size={18} />
                </button>
            )}
            {edges.end && (
                <button type="button" onClick={() => scrollBy(1)} aria-label={t("scroll.right")} className={`${arrow} right-1`}>
                    <ChevronRight size={18} />
                </button>
            )}
        </Tag>
    );
}
