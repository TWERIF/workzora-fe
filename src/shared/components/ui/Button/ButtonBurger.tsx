import { ButtonI } from "@/shared/types";
import { useTheme } from "next-themes";
import IconBurger from "../../svg/IconBurger";
import IconBurgerDark from "../../svg/IconBurgerDark";

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
