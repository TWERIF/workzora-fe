import { ButtonI } from './../../../types/index'
export default function ButtonGradient(props: ButtonI) {
    const {
        text,
        onClick,
        type
    } = props;
    return (
        <button type={type || "button"} className="focus:outline-none text-nowrap active:outline-none bg-gradient text-text-dark rounded-[20px] px-[25px] py-[9px]" onClick={onClick}>{text}</button>
    )
}