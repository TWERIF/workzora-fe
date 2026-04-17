import { ReactNode } from "react";
import IconError from "../../svg/IconError";

interface SubmitI {
    value: boolean;
    setValue: (s: boolean) => void;
    text?: ReactNode;
    errorText?: string;
}
export default function Submit(props: SubmitI) {
    const {
        value,
        setValue,
        text,
        errorText
    } = props;
    return (
        <div className="flex flex-col gap-[6px] w-full">
            <div className="flex items-center gap-[8px]">
                <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    checked={value}
                    className="w-[15px] h-[15px] accent-success border border-checkbox outline-none"
                    onChange={(e) => setValue(e.target.checked)}
                />
                {text}
            </div>
            {
                errorText && (
                    <span className="text-[#FF0000] text-[14px] flex items-center gap-[5px] ml-[18px]">
                        <IconError /> {errorText}
                    </span>
                )
            }
        </div>
    )
}