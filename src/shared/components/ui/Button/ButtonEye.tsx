import { ButtonI } from "@/shared/types";
import IconEye from "../../svg/IconEye";

export default function ButtonEye(props: ButtonI) {
    const {
        text,
        onClick
    } = props;
    return (
        <button type="button" onClick={onClick} className='focus:outline-none active:outline-none'>
            <IconEye />
        </button>
    )
}