import { Vector } from "@/shared/components/svg/Vector";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface UsersCountCardProps {
    count: number;
    labelKey: string;
    onClick?: () => void;
}

export default function UsersCountCard({ count, labelKey, onClick }: UsersCountCardProps) {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={onClick}
            className={`relative rounded-20 p-6 flex flex-col items-center justify-center gap-1 text-center transition-colors ${isDark ? "bg-bg-modalDark hover:bg-white/10" : "bg-bg hover:bg-white/60"
                }`}
        >
            <Vector
            fill={isDark ? "#ffffff" : "#333333"}
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
            />
            <span className="text-3xl font-bold text-success">{count.toLocaleString()}</span>
            <span className="text-sm opacity-70">{t(labelKey)}</span>
            <svg
                className="w-5 h-5 mt-2 text-success"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15L15 5M15 5H7M15 5V13" />
            </svg>
        </button>
    );
}