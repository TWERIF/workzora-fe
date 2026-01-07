'use client'
import { ReactNode } from "react";
import ButtonClose from "../Button/ButtonClose";

interface ModalI {
    children: ReactNode;
    setIsOpen: (s: boolean) => void;
    maxWidth:number;
}

export default function Modal(props: ModalI) {
    const { children, setIsOpen } = props;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div
                className="
                    bg-bg dark:bg-bg-dark text-text dark:text-text-dark
                    w-full h-full rounded-none p-4
                    sm:rounded-[20px] sm:max-w-[100%] sm:h-auto sm:p-6
                    overflow-y-auto
                    flex flex-col
                "
            >
                <div className="w-full flex justify-end">
                    <ButtonClose text={''} onClick={() => setIsOpen(false)} />
                </div>
                {children}
            </div>
        </div>
    );
}
