import { useTheme } from "next-themes";
import IconMoon from "../../svg/IconMoon";
import IconSun from "../../svg/IconSun";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    const toggle = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={isDark}
            className={`
                relative
                w-[63px]
                h-[28px]
                rounded-full
                px-[7px]
                flex items-center
                transition-colors
                duration-300
                ease-in-out
                ${isDark ? "bg-[#3E3E3E]" : "bg-[#EEF3E1]"}
            `}
        >
            <span
                className={`
                    absolute inset-0
                    flex items-center
                    ${isDark ? "justify-start pl-[8px]" : "justify-end pr-[8px]"}
                    pointer-events-none
                `}
            >
                {isDark ? (
                    <IconMoon className="w-[16.25px] h-[16.25px] text-white" fill={"#ffffff"} />
                ) : (
                    <IconSun className="w-[20px] h-[20px] text-text" fill={"#333333"} />
                )}
            </span>

            {/* Гурток-перемикач */}
            <span
                className={`
                    relative
                    z-10
                    w-[22px]
                    h-[22px]
                    rounded-full
                    bg-success
                    transition-transform
                    duration-300
                    ease-in-out
                    ${isDark ? "translate-x-[28px]" : "translate-x-0"}
                `}
            />
        </button>
    );
}