import { ReactNode } from "react";

export default function Marquee({ children }: { children: ReactNode }) {
    return (
        <div
            className="flex w-max gap-3 animate-marquee whitespace-nowrap items-center"
            style={{ animationDuration: "30s" }}
        >
            {children}
            {children}
        </div>
    )
}