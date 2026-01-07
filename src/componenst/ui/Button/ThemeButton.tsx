import IconMoon from "@/componenst/svg/IconMoon";
import IconSun from "@/componenst/svg/IconSun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
    const [isDark, setIsDark] = useState(false);

    const { theme, setTheme } = useTheme();

    const toggle = () => {
        if (theme === "dark") {
            setIsDark(false);
            setTheme("light");
        } else {
            setIsDark(true);
            setTheme("dark");
        }
    };

    useEffect(() => {
        if (theme === "dark") {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, [])

    return (
        <button
            type="button"
            onClick={toggle}
            className="
        relative
        w-[63px]
        h-[28px]
        rounded-full
        bg-success
        transition-colors
        duration-300
        ease-in-out
        flex items-center
      "
        >
            {/* Кружок-перемикач */}
            <span
                className={`
          absolute
          top-[2px]
          w-[24px]
          h-[24px]
          rounded-full
          bg-bg-header
          dark:bg-bg-dark
          shadow
          transition-transform
          duration-300
          ease-in-out
          flex items-center justify-center
          ${isDark ? "translate-x-[35px]" : "translate-x-[2px]"}
        `}
            >
                {isDark ? <IconMoon /> : <IconSun />}
            </span>

            {/* Фонові іконки */}
            <span className="absolute inset-0 flex items-center justify-between px-[6px] pointer-events-none">
                <IconSun fill={isDark ? "white" : null} className={`${!isDark ? "opacity-0" : "opacity-100 "} transition-opacity duration-300`} />
                <IconMoon className={`${!isDark ? "opacity-100" : "opacity-0"} transition-opacity duration-300`} />
            </span>
        </button>
    );
}
