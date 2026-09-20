export const labelClass = "mb-2 block text-sm text-text dark:text-text-dark";

export function fieldClass(hasError = false) {
    return [
        "w-full rounded-20 border bg-input text-sm text-text outline-none transition-colors",
        "placeholder:text-text-muted focus:ring-1 dark:bg-bg-dark dark:text-text-dark",
        hasError
            ? "border-error focus:ring-error"
            : "border-border/50 focus:border-success focus:ring-success dark:border-border/[0.12] dark:focus:border-success",
    ].join(" ");
}

export function groupFieldClass(hasError = false) {
    return [
        "flex h-[50px] items-stretch overflow-hidden rounded-20 border bg-input text-text transition-colors",
        "focus-within:ring-1 dark:bg-bg-dark dark:text-text-dark",
        hasError
            ? "border-error focus-within:ring-error"
            : "border-border/50 focus-within:border-success focus-within:ring-success dark:border-border/[0.12] dark:focus-within:border-success",
    ].join(" ");
}
