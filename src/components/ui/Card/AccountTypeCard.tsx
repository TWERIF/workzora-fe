import { ReactNode } from "react";

interface CardI {
    children: ReactNode;
    type: string;
    setTypeValue: (s: string) => void;
    typeValue: string;
}

export default function AccountTypeCard(props: CardI) {
    const { children, type, setTypeValue, typeValue } = props;

    const active = typeValue === type; // активний стан похідний від typeValue

    const changeType = () => {
        if (typeValue !== type) {
            setTypeValue(type);
        } else {
            setTypeValue("");
        }
    }

    return (
        <div
            className="bg-white rounded-20 border-checkbox border-[1px] py-[40px] px-[27px] text-text dark:text-text-dark dark:bg-input-dark cursor-pointer"
            style={{
                boxShadow: active ? "0px 0px 20px #7EA310" : "none",
                border: active ? "0" : "1px solid var(--checkbox)",
                color: active ? "#7EA310" : "",
                fontWeight: active ? "600" : "400",
            }}
            onClick={changeType}
        >
            {children}
        </div>
    )
}
