import { ReactNode } from "react";

interface LinkI{
    href:string;
    text:ReactNode;
    blank?:boolean;
}
export default function Link(props:LinkI){
    const {
        href,
        text,
        blank
    } = props;
    return(
        <a href={href} target={blank ? "_blank" : "_self"} className="text-success">{text}</a>
    )
}