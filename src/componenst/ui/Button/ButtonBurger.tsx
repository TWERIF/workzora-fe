import IconBurger from "@/componenst/svg/IconBurger";
import IconBurgerDark from "@/componenst/svg/IconBurgerDark";
import { ButtonI } from "@/types";
import { useTheme } from "next-themes";

interface BurgerI extends ButtonI {
    isOpen: boolean;
}

export default function ButtonBurger({ onClick, isOpen }: BurgerI) {
    const { theme } = useTheme();

    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            {theme === "dark" ? <IconBurgerDark /> : <IconBurger />}
        </button>
    );
}
