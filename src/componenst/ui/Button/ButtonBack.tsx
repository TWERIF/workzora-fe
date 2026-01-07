import IconBack from "@/componenst/svg/IconBack";
import IconBackLight from "@/componenst/svg/IconBackLight";
import { ButtonI } from "@/types";
import { useTheme } from "next-themes";

export default function ButtonBack(props:ButtonI){
    const {
        onClick
    } = props;
    const { theme } = useTheme();
    return(
        <button onClick={onClick}>{theme==="dark" ? <IconBackLight /> : <IconBack />}</button>
    )
}