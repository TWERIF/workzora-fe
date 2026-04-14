
import { ButtonI } from "@/shared/types";
import { useTheme } from "next-themes";
import IconCloseDark from "../../svg/IconCloseDark";
import IconClose from "../../svg/IconClose";

export default function ButtonClose(props: ButtonI) {
    const {
        onClick
    } = props;
    const { theme } = useTheme();
    return (
        <button onClick={onClick}>{theme === "dark" ? <IconCloseDark /> : <IconClose />}</button>
    )
}