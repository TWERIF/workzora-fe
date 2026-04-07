'use client'
import { ReactNode } from "react";
import ButtonClose from "../Button/ButtonClose";

interface ModalI {
    children: ReactNode;
    setIsOpen: (s: boolean) => void;
    maxWidth: number;
}

export default function Modal(props: ModalI) {
    const { children, setIsOpen } = props;

    return (
        <div className="fixed inset-0 bg-black/75 z-50 overflow-y-auto">
            <div className="min-h-full flex justify-center items-start sm:py-6 max-w-sm:py-0 max-w-sm:justify-start">
                <div
                    className="
                        bg-bg dark:bg-bg-dark text-text dark:text-text-dark
                        w-[409px] h-auto sm:h-full
                        rounded-none p-4
                        sm:rounded-[20px] sm:max-w-full sm:p-6
                        flex flex-col
                    "
                >
                    <div className="w-full flex justify-end">
                        <ButtonClose text={''} onClick={() => setIsOpen(false)} />
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
