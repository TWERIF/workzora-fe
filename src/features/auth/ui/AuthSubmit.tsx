import type { ButtonHTMLAttributes } from "react";

interface AuthSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function AuthSubmit({ loading, disabled, children, type = "submit", ...props }: AuthSubmitProps) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            aria-busy={loading}
            className="h-[45px] w-full rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            {...props}
        >
            {loading ? "..." : children}
        </button>
    );
}
