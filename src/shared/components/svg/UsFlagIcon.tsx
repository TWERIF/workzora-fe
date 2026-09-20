import { useId } from "react";
import type { SVGProps } from "react";

/** Прапор США (для валюти USD). */
export default function UsFlagIcon(props: SVGProps<SVGSVGElement>) {
    // унікальний id, щоб кілька прапорів на сторінці не конфліктували
    const clipId = `us-flag-${useId().replace(/:/g, "")}`;

    return (
        <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <g clipPath={`url(#${clipId})`}>
                <rect width="22" height="16" rx="2" fill="white" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H9.42857V7.46667H0V0Z"
                    fill="#1A47B8"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.42857 0V1.06667H22V0H9.42857ZM9.42857 2.13333V3.2H22V2.13333H9.42857ZM9.42857 4.26667V5.33333H22V4.26667H9.42857ZM9.42857 6.4V7.46667H22V6.4H9.42857ZM0 8.53333V9.6H22V8.53333H0ZM0 10.6667V11.7333H22V10.6667H0ZM0 12.8V13.8667H22V12.8H0ZM0 14.9333V16H22V14.9333H0Z"
                    fill="#F93939"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.04688 1.06668V2.13335H2.09449V1.06668H1.04688ZM3.14211 1.06668V2.13335H4.18973V1.06668H3.14211ZM5.23735 1.06668V2.13335H6.28497V1.06668H5.23735ZM7.33259 1.06668V2.13335H8.38021V1.06668H7.33259ZM6.28497 2.13335V3.20001H7.33259V2.13335H6.28497ZM4.18973 2.13335V3.20001H5.23735V2.13335H4.18973ZM2.09449 2.13335V3.20001H3.14211V2.13335H2.09449ZM1.04688 3.20001V4.26668H2.09449V3.20001H1.04688ZM3.14211 3.20001V4.26668H4.18973V3.20001H3.14211ZM5.23735 3.20001V4.26668H6.28497V3.20001H5.23735ZM7.33259 3.20001V4.26668H8.38021V3.20001H7.33259ZM1.04688 5.33335V6.40001H2.09449V5.33335H1.04688ZM3.14211 5.33335V6.40001H4.18973V5.33335H3.14211ZM5.23735 5.33335V6.40001H6.28497V5.33335H5.23735ZM7.33259 5.33335V6.40001H8.38021V5.33335H7.33259ZM6.28497 4.26668V5.33335H7.33259V4.26668H6.28497ZM4.18973 4.26668V5.33335H5.23735V4.26668H4.18973ZM2.09449 4.26668V5.33335H3.14211V4.26668H2.09449Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id={clipId}>
                    <rect width="22" height="16" rx="2" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
