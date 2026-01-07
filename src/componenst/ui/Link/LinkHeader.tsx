import { ReactNode } from "react";

interface LinkI {
    href: string;
    children: ReactNode;
    onClick?:()=>void;
}
export default function Link(props: LinkI) {
    const {
        href,
        children,
        onClick
    } = props;
    return (
        <a href={href} onClick={onClick} className="text-text dark:text-text-dark text-[16px]">{children}</a>
    )
}