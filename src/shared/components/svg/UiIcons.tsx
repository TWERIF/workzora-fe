import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const make = (paths: ReactNode) =>
    function UiIcon({ size = 20, ...props }: IconProps) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                {...props}
            >
                {paths}
            </svg>
        );
    };

export const IconMail = make(
    <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3.5 7 8.5 6 8.5-6" />
    </>,
);

export const IconPhone = make(
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
);

export const IconUpload = make(
    <>
        <path d="M12 15V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </>,
);

export const IconTrash = make(
    <>
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4h6v3" />
    </>,
);

export const IconClose = make(
    <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </>,
);

export const IconChevronDown = make(<path d="m6 9 6 6 6-6" />);

export const IconInfo = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
    </>,
);

export const IconEye = make(
    <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
    </>,
);

export const IconPencil = make(
    <>
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
    </>,
);

export const IconUser = make(
    <>
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
    </>,
);

export const IconImage = make(
    <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
    </>,
);

export const IconCalendar = make(
    <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </>,
);

export const IconClock = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </>,
);

export const IconChecks = make(
    <>
        <path d="m2 12.5 4.5 4.5L15 8.5" />
        <path d="m10.5 16 1 1L20 8.5" />
    </>,
);

export const IconCheck = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);

export const IconSearch = make(
    <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </>,
);
