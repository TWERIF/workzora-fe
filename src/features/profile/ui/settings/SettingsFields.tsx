import { IconChevronDown } from "@/shared/components/svg/UiIcons";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";

export function SettingsSection({ id, title, description, counter, children }: {
    id: string;
    title: string;
    description?: string;
    counter?: number;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-40">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-[22px] font-bold leading-[1.5] sm:text-[25px]">{title}</h2>
                {counter !== undefined && <span className="text-xl font-semibold text-primary">({counter})</span>}
            </div>
            {description && <p className="mt-2 text-sm leading-6">{description}</p>}
            <div className="mt-6">{children}</div>
        </section>
    );
}

export function FieldShell({ label, required, hint, htmlFor, className = "", children }: {
    label: string;
    required?: boolean;
    hint?: string;
    htmlFor?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
            <label htmlFor={htmlFor} className="text-sm leading-[26px]">
                {label}
                {required && "*"}
            </label>
            {children}
            {hint && <span className="text-xs text-main-50">{hint}</span>}
        </div>
    );
}

const boxClass =
    "flex h-[50px] items-center gap-2 rounded-20 border border-main-10 bg-background px-15 transition-colors focus-within:border-primary";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
    prefix?: string;
    suffix?: string;
    hint?: string;
    wrapperClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    { label, icon, prefix, suffix, hint, required, wrapperClassName, ...inputProps },
    ref,
) {
    const id = useId();
    return (
        <FieldShell label={label} required={required} hint={hint} htmlFor={id} className={wrapperClassName}>
            <div className={boxClass}>
                {icon && <span className="shrink-0 text-main-50">{icon}</span>}
                {prefix && <span className="shrink-0 text-base">{prefix}</span>}
                <input
                    id={id}
                    ref={ref}
                    required={required}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                    {...inputProps}
                />
                {suffix && <span className="shrink-0 text-xs italic text-main-50">{suffix}</span>}
            </div>
        </FieldShell>
    );
});

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
    { label, icon, required, children, ...selectProps },
    ref,
) {
    const id = useId();
    return (
        <FieldShell label={label} required={required} htmlFor={id}>
            <div className={`${boxClass} relative`}>
                {icon && <span className="shrink-0">{icon}</span>}
                <select
                    id={id}
                    ref={ref}
                    required={required}
                    className="h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-sm outline-none"
                    {...selectProps}
                >
                    {children}
                </select>
                <IconChevronDown size={16} className="pointer-events-none absolute right-4 text-main-50" />
            </div>
        </FieldShell>
    );
});

interface ChoiceProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const RadioChoice = forwardRef<HTMLInputElement, ChoiceProps>(function RadioChoice({ label, ...inputProps }, ref) {
    return (
        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm">
            <input ref={ref} type="radio" className="peer sr-only" {...inputProps} />
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-main-10 transition-colors peer-checked:border-primary peer-checked:[&>span]:block peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                <span className="hidden h-2 w-2 rounded-full bg-primary" />
            </span>
            {label}
        </label>
    );
});

export const RadioCard = forwardRef<HTMLInputElement, ChoiceProps & { description: string }>(function RadioCard(
    { label, description, ...inputProps },
    ref,
) {
    return (
        <label className="relative flex min-h-[90px] cursor-pointer items-start gap-3 rounded-20 border border-main-10 p-5 transition-colors has-[:checked]:border-primary/30 has-[:checked]:bg-primary-10">
            <input ref={ref} type="radio" className="peer sr-only" {...inputProps} />
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-main-10 transition-colors peer-checked:border-primary peer-checked:[&>span]:block peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                <span className="hidden h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-medium">{label}</span>
                <span className="mt-1 block text-xs text-main-50">{description}</span>
            </span>
        </label>
    );
});
