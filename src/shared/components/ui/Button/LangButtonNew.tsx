import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { BritishFlag } from "../../svg/BritishFlag";
import { ChevronDown } from "lucide-react";
import { UaFlag } from "../../svg/UaFlag";

type LangOption = {
    code: string;
    label: string;
    Flag: React.FC;
};

const LANG_OPTIONS: LangOption[] = [
    { code: "en", label: "English", Flag: BritishFlag },
    { code: "uk", label: "Українська", Flag: UaFlag },
];

export default function LangButtonNew() {
    const router = useRouter();
    const { i18n } = useTranslation("common");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const locale = router.locale || "en";
    const currentOption =
        LANG_OPTIONS.find((option) => option.code === locale) ?? LANG_OPTIONS[0];

    const selectLang = async (nextLocale: string) => {
        setIsOpen(false);

        if (nextLocale === locale) return;

        await router.push(router.pathname, router.asPath, { locale: nextLocale });
        i18n.changeLanguage(nextLocale);
    };

    // Закриваємо список при кліку поза компонентом
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Закриваємо список по Escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="
                    h-[22px]
                    p-[1px]
                    flex items-center justify-center gap-1
                "
            >
                <span className="w-[22px] h-[22px] flex items-center justify-center bg-white dark:bg-bg-dark">
                    <currentOption.Flag />
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="
                        absolute right-0 top-full mt-1
                        min-w-[140px]
                        bg-white dark:bg-bg-dark
                        border border-gray-200 dark:border-gray-700
                        rounded-md shadow-lg
                        py-1
                        z-50
                    "
                >
                    {LANG_OPTIONS.map((option) => {
                        const isSelected = option.code === locale;

                        return (
                            <li key={option.code} role="option" aria-selected={isSelected}>
                                <button
                                    type="button"
                                    onClick={() => selectLang(option.code)}
                                    className={`
                                        w-full flex items-center gap-2
                                        px-3 py-1.5
                                        text-sm text-left
                                        hover:bg-gray-100 dark:hover:bg-gray-800
                                        ${isSelected ? "font-semibold" : ""}
                                    `}
                                >
                                    <span className="w-[18px] h-[18px] flex items-center justify-center">
                                        <option.Flag />
                                    </span>
                                    {option.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}