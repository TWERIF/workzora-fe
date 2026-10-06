import type { SVGProps } from "react";

export default function PaginationArrowIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg aria-hidden="true" width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="49" height="49" rx="24.5" fill="#7EA310"/>
            <path d="M21.6667 18.8333L27.3333 24.5L21.6667 30.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
