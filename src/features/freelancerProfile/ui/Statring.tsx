type StatRingColor = "success" | "star" | "secondary";

interface StatRingProps {
    label: string;
    sublabel: string;
    centerText: string;
    progress: number;
    color?: StatRingColor;
}

const SIZE = 78;
const STROKE = 8.54;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ARC_COLORS: Record<StatRingColor, string> = {
    success: "stroke-success",
    star: "stroke-star",
    secondary: "stroke-secondary",
};

export const StatRing = ({ label, sublabel, centerText, progress, color = "success" }: StatRingProps) => {
    const offset = CIRCUMFERENCE * (1 - Math.min(Math.max(progress, 0), 1));

    return (
        <div className="flex min-h-[110px] flex-1 items-center justify-between gap-4 rounded-3xl bg-surface py-4 pl-6 pr-4 dark:bg-bg-modalDark">
            <div className="flex min-w-0 flex-col gap-[6px]">
                <p className="text-base font-medium leading-[29px] text-text dark:text-text-dark">{label}</p>
                <p className="text-sm text-text-light">{sublabel}</p>
            </div>

            <div className="relative size-[78px] shrink-0">
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        strokeWidth={STROKE}
                        className="fill-none stroke-border-light dark:stroke-white/10"
                    />
                    {progress > 0 && (
                        <circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={offset}
                            className={`fill-none transition-[stroke-dashoffset] duration-500 ${ARC_COLORS[color]}`}
                        />
                    )}
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs text-text-light">
                    {centerText}
                </span>
            </div>
        </div>
    );
};
