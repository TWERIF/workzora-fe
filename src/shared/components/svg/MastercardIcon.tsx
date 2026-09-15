import type { SVGProps } from "react";

export const MastercardIcon = ({
    title = "Mastercard",
    ...props
}: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg
        width="54"
        height="30"
        viewBox="0 0 54 30"
        fill="none"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="20" cy="15" r="11" fill="#EB001B" />
        <circle cx="34" cy="15" r="11" fill="#F79E1B" />
        <path
            d="M27 6.62a10.98 10.98 0 0 0 0 16.76 10.98 10.98 0 0 0 0-16.76Z"
            fill="#FF5F00"
        />
    </svg>
);

export default MastercardIcon;
