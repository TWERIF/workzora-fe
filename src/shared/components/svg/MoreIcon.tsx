import type { SVGProps } from "react";

export const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="4" cy="10" r="1.8" />
        <circle cx="10" cy="10" r="1.8" />
        <circle cx="16" cy="10" r="1.8" />
    </svg>
);

export default MoreIcon;