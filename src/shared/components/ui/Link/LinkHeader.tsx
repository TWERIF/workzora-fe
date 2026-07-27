import { ReactNode } from "react";

interface LinkI {
    href: string;
    children?: ReactNode;
    text?: ReactNode;
    form?: boolean;
    onClick?: () => void;
    className?: string;
    hover?: boolean;
}
export default function Link(props: LinkI) {
    const {
        href,
        children,
        text,
        form,
        onClick,
        className,
        hover = true
    } = props;
    return (
        <a href={href} onClick={onClick} className={`text-text dark:text-text-dark text-[16px] transition-all rounded-[8px] ${hover ? "hover:bg-[#EEF3E1] hover:p-2 hover:dark:bg-[#3E3E3E] hover:text-success hover:dark:text-success" : ""} ${className}`} style={{ color: `${form && "#7EA310"}` }}>{children || text}</a>
    )
}