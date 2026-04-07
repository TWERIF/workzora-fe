import IconClose from "@/components/svg/IconClose";
import IconCloseDark from "@/components/svg/IconCloseDark";
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