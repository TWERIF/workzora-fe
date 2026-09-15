import type { SVGProps } from "react";

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.2" />
        <path
            d="M8 7.1v4M8 5.1v.6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
        />
    </svg>
);

export default InfoIcon;