import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import IconUa from "@/components/svg/IconUa";
import IconUsa from "@/components/svg/IconUsa";

export default function LangButton() {
    const router = useRouter();
    const { i18n } = useTranslation("common");

    const locale = router.locale || "en";

    const toggleLang = async () => {
        const nextLocale = locale === "en" ? "uk" : "en";

        await router.push(router.pathname, router.asPath, { locale: nextLocale });
        i18n.changeLanguage(nextLocale);
    };

    return (
        <button
            type="button"
            onClick={toggleLang}
            className="
                w-[22px] h-[22px]          /* фіксовані розміри */
                rounded-full       /* круглий бордер */
                p-[1px]            /* невеликий паддінг для градієнту */
                bg-gradient-to-b from-[#216B52] to-[#7EA310]
                flex items-center justify-center
            "
        >
            <span className="w-full h-full flex items-center justify-center rounded-full bg-white dark:bg-bg-dark">
                {locale === "en" ? <IconUsa /> : <IconUa />}
            </span>
        </button>
    );
}
