import { IconEyeOffLine, IconLockLine, IconUserRound } from "@/shared/components/svg/AuthIcons";
import { useId, useState, type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface AuthFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    icon?: "user" | "lock";
}

export default function AuthField({ label, value, onChange, error, icon = "user", type = "text", required = true, ...inputProps }: AuthFieldProps) {
    const { t } = useTranslation("auth");
    const id = useId();
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const errorId = `${id}-error`;

    return (
        <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={id} className="text-sm leading-[26px]">
                {label}
                {required && "*"}
            </label>
            <div
                className={`flex h-[50px] items-center gap-2 rounded-20 border bg-background px-15 transition-colors focus-within:border-primary ${
                    error ? "border-status-danger" : "border-main-10"
                }`}
            >
                <input
                    id={id}
                    type={isPassword && visible ? "text" : type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                    {...inputProps}
                />
                {isPassword ? (
                    <button
                        type="button"
                        onClick={() => setVisible((current) => !current)}
                        aria-label={t(visible ? "fields.hidePassword" : "fields.showPassword")}
                        className="text-main-50 transition-colors hover:text-primary"
                    >
                        {visible ? <IconEyeOffLine /> : <IconLockLine />}
                    </button>
                ) : icon === "lock" ? (
                    <IconLockLine className="shrink-0 text-main-50" />
                ) : (
                    <IconUserRound className="shrink-0 text-main-50" />
                )}
            </div>
            {error && (
                <span id={errorId} className="text-xs text-status-danger">
                    {error}
                </span>
            )}
        </div>
    );
}
