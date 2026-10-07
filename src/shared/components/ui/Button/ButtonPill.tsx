import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonPillProps {
  text: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function ButtonPill({
  text,
  icon,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: ButtonPillProps) {
  const classes = `group inline-flex shrink-0 items-center justify-center gap-[6px] overflow-hidden rounded-full bg-gradient px-6 py-3 text-sm text-white transition-all duration-500 ease-in-out hover:bg-gradientReverse hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success disabled:opacity-50 ${className}`;

  const content = (
    <>
      {icon && <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="relative block h-[1.5em] overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
          <span className="block leading-[1.5em]">{text}</span>
          <span className="block leading-[1.5em]" aria-hidden="true">
            {text}
          </span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
