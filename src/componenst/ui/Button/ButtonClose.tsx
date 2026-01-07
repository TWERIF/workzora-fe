import IconClose from "@/componenst/svg/IconClose";
import IconCloseDark from "@/componenst/svg/IconCloseDark";
import { ButtonI } from "@/types";
import { useTheme } from "next-themes";

export default function ButtonClose(props: ButtonI) {
    const {
        onClick
    } = props;
    const { theme } = useTheme();
    return (
        <button onClick={onClick}>{theme === "dark" ? <IconCloseDark /> : <IconClose />}</button>
    )
}