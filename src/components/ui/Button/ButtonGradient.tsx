import {ButtonI} from './../../../types/index'

export default function ButtonGradient(props:ButtonI ){
    const {
        text, 
        onClick,
        type,
        disabled
    } = props;
    return (
        <button disabled={disabled} type={type || "button"} className="focus:outline-none active:outline-none bg-gradient text-text-dark rounded-[20px] px-[50px] py-[15px]" onClick={onClick}>{text}</button>
    )
}