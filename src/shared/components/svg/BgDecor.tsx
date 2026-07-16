import React from "react";

/**
 * Decorative background SVGs, copied as static assets to /public/images/decor/.
 * Kept as <img> (not inlined) because the source files are large, generated
 * exports (gradients, hundreds of path nodes) — inlining them as JSX risks
 * attribute-casing bugs (stop-color -> stopColor etc.) for zero visual gain.
 *
 * Copy the 4 files from this delivery's /svg folder into:
 *   public/images/decor/bg-network.svg
 *   public/images/decor/bg-glow.svg
 *   public/images/decor/bg-polygon-green.svg
 *   public/images/decor/logo-mark.svg
 */

interface DecorProps {
  className?: string;
}

/** Faint wireframe / network lines — used behind Hero and the search block. */
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

/** Soft radial glow overlay, sits above bg-network / photography. */
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

/** Green low-poly shape used as a corner accent (How it works / FAQ / footer). */
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

/** Small hexagon / cube brand mark, used next to the "WorkZora" wordmark in the header. */
export function LogoMark({ className = "w-8 h-8" }: DecorProps) {
  return <img src="/images/decor/logo-mark.svg" alt="WorkZora" className={className} />;
}
