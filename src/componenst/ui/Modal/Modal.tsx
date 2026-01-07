'use client'
import { ReactNode } from "react";
import ButtonClose from "../Button/ButtonClose";

interface ModalI {
    children: ReactNode;
    maxWidth: number;
    setIsOpen: (s: boolean) => void;
}

export default function Modal(props: ModalI) {
    const { children, maxWidth, setIsOpen } = props;

    const modalWidthClass = maxWidth > 409 ? "w-[409px]" : "w-full";

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 sm:p-0">
            <div
                className={`
                    bg-bg dark:bg-bg-dark text-text dark:text-text-dark
                    rounded-[20px] p-[20px]
                    ${modalWidthClass}
                    max-h-full
                    overflow-y-auto
                `}
            >
                <div className="w-full flex justify-end">
                    <ButtonClose text={''} onClick={() => setIsOpen(false)} />
                </div>
                {children}
            </div>
        </div>
    );
}
