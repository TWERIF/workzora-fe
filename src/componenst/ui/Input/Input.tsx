import IconError from "@/componenst/svg/IconError";
import { useState } from "react";
import ButtonEye from "../Button/ButtonEye";
import { InputI } from "@/types";

export default function Input(props: InputI) {
    const [toText, setToText] = useState<boolean>(false)
    const {
        value,
        setValue,
        errorText,
        password,
        placeholder
    } = props;
    const changeToText = () => {
        setToText((prev) => !prev);
    }
    return (
        <div className="flex flex-col gap-[6px] w-full">
            <div
                className="
            bg-input 
            dark:bg-input-dark
            text-text-muted 
            border 
            rounded-[20px]
            relative
            flex
            items-center
        "
                style={{ borderColor: errorText ? "#FF0000" : "" }}
            >
                <input
                    type={password ? (toText ? "text" : "password") : "text"}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    value={value}
                    className="w-[calc(100%_-_30px)] px-[15px] py-[13px] rounded-[20px] focus:outline-none dark:bg-input-dark"
                />

                {password && <ButtonEye text={<></>} onClick={changeToText} />}
            </div>

            {errorText && (
                <span className="text-[#FF0000] text-[14px] flex items-center gap-[5px] ml-[18px]">
                    <IconError /> {errorText}
                </span>
            )}
        </div>

    )
}