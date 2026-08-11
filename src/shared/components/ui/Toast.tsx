import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
}

export default function Toast({ message }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const showTimeout = setTimeout(() => setVisible(true), 10);

        const hideTimeout = setTimeout(() => setVisible(false), 2700);

       const unmountTimeout = setTimeout(() => setMounted(false), 3000);

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
            clearTimeout(unmountTimeout);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed top-6 right-6 z-[100] pointer-events-none"
        >
            <div
                className={[
                    "pointer-events-auto flex items-center gap-3 max-w-sm",
                    "px-4 py-3 rounded-20 border border-border shadow-input dark:shadow-input-dark",
                    "bg-white text-text dark:bg-bg-modalDark dark:text-text-dark",
                    "transition-all duration-300 ease-out",
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2",
                ].join(" ")}
            >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success/10 text-success shrink-0">
                    <Icon icon="lucide:check" className="w-4 h-4" />
                </span>
                <p className="text-sm font-medium leading-snug">{message}</p>
            </div>
        </div>
    );
}