import type { SVGProps } from "react";

/** Внутрішня валюта платформи (T) */
export const TokenIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="14" cy="14" r="14" className="fill-success" />
        <path
            d="M8.5 9.5h11v2.6h-4.2v9.4h-2.6v-9.4H8.5V9.5Z"
            fill="#fff"
        />
    </svg>
);

export default TokenIcon;