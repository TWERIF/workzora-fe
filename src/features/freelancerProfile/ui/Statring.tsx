interface StatRingProps {
    label: string;
    sublabel: string;
    centerText: string;
    progress: number; // 0..1
}

const SIZE = 64;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const StatRing = ({ label, sublabel, centerText, progress }: StatRingProps) => {
    const offset = CIRCUMFERENCE * (1 - Math.min(Math.max(progress, 0), 1));

    return (
        <div className="flex flex-1 items-center gap-4 rounded-20 border border-border bg-bg-header px-15 py-13 dark:bg-bg-modalDark">
            <svg width={SIZE} height={SIZE} className="shrink-0 -rotate-90">
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE}
                    className="fill-none stroke-checkbox/40"
                />
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    className="fill-none stroke-success transition-[stroke-dashoffset] duration-500"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="rotate-90 fill-text text-[11px] font-semibold dark:fill-text-dark"
                    style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
                >
                    {centerText}
                </text>
            </svg>
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text dark:text-text-dark">{label}</p>
                <p className="truncate text-xs text-text-muted">{sublabel}</p>
            </div>
        </div>
    );
};