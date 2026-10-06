import { isAxiosError } from "axios";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../model/useAuth";
import { useAuthRedirect } from "../model/useAuthRedirect";
import { emailError, requiredError } from "../model/validation";
import AuthField from "./AuthField";
import AuthLayout from "./AuthLayout";
import AuthSubmit from "./AuthSubmit";
import SocialSignIn from "./SocialSignIn";

interface LoginErrors {
    email?: string;
    password?: string;
    form?: string;
}

export default function LoginForm() {
    const { t } = useTranslation("auth");
    const { login, isLoggingIn } = useAuth();
    const { redirectAfterAuth, withNext } = useAuthRedirect();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [errors, setErrors] = useState<LoginErrors>({});

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const nextErrors: LoginErrors = { email: emailError(email), password: requiredError(password) };
        setErrors(nextErrors);
        if (nextErrors.email || nextErrors.password) return;

        try {
            await login({ email: email.trim(), password, remember });
            redirectAfterAuth();
        } catch (error) {
            const unauthorized = isAxiosError(error) && error.response?.status === 401;
            setErrors({ form: t(unauthorized ? "login.invalid" : "errors.generic") });
        }
    };

    return (
        <AuthLayout scene="login" title={t("login.title")} subtitle={t("login.subtitle")}>
            <form noValidate onSubmit={submit} className="flex flex-col gap-3">
                <AuthField
                    label={t("fields.email")}
                    type="email"
                    autoComplete="email"
                    placeholder={t("fields.emailPlaceholder")}
                    value={email}
                    onChange={setEmail}
                    error={errors.email && t(errors.email)}
                />
                <AuthField
                    label={t("fields.password")}
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("fields.passwordPlaceholder")}
                    value={password}
                    onChange={setPassword}
                    error={errors.password && t(errors.password)}
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <label className="flex cursor-pointer items-center gap-1.5">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(event) => setRemember(event.target.checked)}
                            className="h-[18px] w-[18px] cursor-pointer rounded-md accent-primary"
                        />
                        {t("login.remember")}
                    </label>
                    <Link href={withNext("/forgot-password")} className="border-b border-dashed border-primary text-primary">
                        {t("login.forgot")}
                    </Link>
                </div>
                {errors.form && (
                    <p role="alert" className="text-center text-sm text-status-danger">
                        {errors.form}
                    </p>
                )}
                <AuthSubmit loading={isLoggingIn}>{t("login.submit")}</AuthSubmit>
            </form>

            <SocialSignIn onSuccess={redirectAfterAuth} />

            <p className="mt-[30px] text-center text-xs text-main-50">
                {t("login.newHere")}{" "}
                <Link href={withNext("/registration")} className="text-primary hover:underline">
                    {t("login.create")}
                </Link>
            </p>
        </AuthLayout>
    );
}
