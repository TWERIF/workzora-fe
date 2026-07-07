import { SVGProps } from "react";

export const CheckBadgeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="10" className="fill-success" />
    <path
      d="M6 10.2l2.4 2.4L14 7"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = ({
  filled,
  ...props
}: SVGProps<SVGSVGElement> & { filled: boolean }) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"
      className={filled ? "fill-success" : "fill-checkbox"}
    />
  </svg>
);

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M2 4.5A1.5 1.5 0 013.5 3h13A1.5 1.5 0 0118 4.5v8A1.5 1.5 0 0116.5 14H8l-4 3v-3H3.5A1.5 1.5 0 012 12.5v-8z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const BlockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4.5 4.5l11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ReportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M4 2v16M4 2.8l11.2 2.7a1 1 0 010 1.9L4 10.1"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M7.5 4.5l6 5.5-6 5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);