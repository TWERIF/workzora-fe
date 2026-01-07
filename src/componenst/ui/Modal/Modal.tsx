'use client'
import { ReactNode } from "react";
import ButtonClose from "../Button/ButtonClose";

interface ModalI {
    children: ReactNode;
    maxWidth: number;
    setIsOpen: (s: boolean) => void;
}

export default function Modal(props: ModalI) {
    const {
        children,
        maxWidth,
        setIsOpen
    } = props;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div
                className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark rounded-[20px] p-[20px]"
                style={{ width: maxWidth > 409 ? "409px" : "320px" }}
            >
                <div className="w-full flex justify-end">
                    <ButtonClose text={''} onClick={() => setIsOpen(false)} />
                </div>
                {children}
            </div>
        </div>
    );
}
