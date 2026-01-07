import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import IconUa from "@/componenst/svg/IconUa";
import IconUsa from "@/componenst/svg/IconUsa";

export default function LangButton() {
    const router = useRouter();
    const { i18n } = useTranslation("common");

    const locale = router.locale || "en";

    const toggleLang = async () => {
        const nextLocale = locale === "en" ? "uk" : "en";

        await router.push(
            router.pathname,
            router.asPath,
            { locale: nextLocale }
        );

        i18n.changeLanguage(nextLocale);
    };

    return (
        <button
            type="button"
            onClick={toggleLang}
            className="p-[1px] rounded-full bg-gradient-to-b from-[#216B52] to-[#7EA310]"
        >
            <span className="flex items-center justify-center bg-white dark:bg-bg-dark rounded-full p-[2px]">
                {locale === "en" ? <IconUsa /> : <IconUa />}
            </span>
        </button>
    );
}
