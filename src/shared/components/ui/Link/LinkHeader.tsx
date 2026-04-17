import { ReactNode } from "react";

interface LinkI {
    href: string;
    children?: ReactNode;
    text?:ReactNode;
    form?:boolean;
    onClick?:()=>void;
}
export default function Link(props: LinkI) {
    const {
        href,
        children,
        text,
        form,
        onClick
    } = props;
    return (
        <a href={href} onClick={onClick} className="text-text dark:text-text-dark text-[16px]" style={{color:`${form && "#7EA310"}`}}>{children || text}</a>
    )
}