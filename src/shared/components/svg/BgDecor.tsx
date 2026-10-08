import React from "react";

interface DecorProps {
  className?: string;
}

export function BgNetwork({ className = "" }: DecorProps) {
  return (
    <img
      src="/images/decor/bg-network.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-20 ${className}`}
    />
  );
}

export function BgGlow({ className = "" }: DecorProps) {
  return (
    <img
      src="/images/decor/bg-glow.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 w-full h-full object-cover mix-blend-soft-light ${className}`}
    />
  );
}

export function BgPolygonGreen({ className = "" }: DecorProps) {
  return (
    <img
      src="/images/decor/bg-polygon-green.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
    />
  );
}

export function LogoMark({ className = "w-8 h-8" }: DecorProps) {
  return <img src="/images/decor/logo-mark.svg" alt="WorkZora" className={className} />;
}
