import { ButtonI } from "@/types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ButtonSocial(props: ButtonI) {
    const {
        onClick,
        text
    } = props;
    const { theme } = useTheme();
    const { t } = useTranslation("common");


    const [mounted, setMounted] = useState(() => typeof window !== 'undefined');

    if (!mounted) return null;
    return (
        <button
            className="w-full rounded-[20px] bg-bg-header dark:bg-bg-modalDark p-[15px]"
            onClick={onClick}
            style={{
                boxShadow: theme === "dark" ? "0px 0px 20px #00000040" : "none",
                border: theme === "dark" ? "0" : "1px solid #C8C7C7",
            }}
        >
            {text}
        </button>
    )
}