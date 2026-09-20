import type { SVGProps } from "react";

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path
                d="M9 2v14M2 9h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
