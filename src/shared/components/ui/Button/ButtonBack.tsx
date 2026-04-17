import { ButtonI } from "@/shared/types";
import { useTheme } from "next-themes";
import IconBack from "../../svg/IconBack";
import IconBackLight from "../../svg/IconBackLight";

export default function ButtonBack(props: ButtonI) {
    const {
        onClick
    } = props;
    const { theme } = useTheme();
    return (
        <button onClick={onClick}>{theme === "dark" ? <IconBackLight /> : <IconBack />}</button>
    )
}