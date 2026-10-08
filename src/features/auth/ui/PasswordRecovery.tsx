import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { httpStatus, requestErrorKey } from "../model/errors";
import { useAuthRedirect } from "../model/useAuthRedirect";
import { useCooldown } from "../model/useCooldown";
import { usePasswordReset } from "../model/useEmailVerification";
import { confirmPasswordError, emailError, passwordError } from "../model/validation";
import AuthField from "./AuthField";
import AuthLayout from "./AuthLayout";
import AuthSubmit from "./AuthSubmit";
import CodeStep from "./CodeStep";
import PasswordRequirements from "./PasswordRequirements";

type Step = "email" | "code" | "password" | "done";

interface RecoveryErrors {
    email?: string;
    code?: string;
    password?: string;
    confirm?: string;
    form?: string;
}

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

const initialEmail = (value: string | string[] | undefined) => (typeof value === "string" ? value : "");

export default function PasswordRecovery() {
    const { t } = useTranslation("auth");
    const router = useRouter();
    const locale = router.locale ?? "en";
    const { withNext } = useAuthRedirect();
    const { requestCode, checkCode, resetPassword, isRequesting, isChecking, isResetting } = usePasswordReset();
    const cooldown = useCooldown(RESEND_SECONDS);

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState<RecoveryErrors>({});

    const queryEmail = initialEmail(router.query.email);
    useEffect(() => {
        if (queryEmail) setEmail((current) => current || queryEmail);
    }, [queryEmail]);

    const sendCode = async () => {
        await requestCode({ email: email.trim(), locale });
        cooldown.start();
    };

    const submitEmail = async (event: FormEvent) => {
        event.preventDefault();
        const error = emailError(email);
        setErrors({ email: error });
        if (error) return;

        try {
            await sendCode();
            setCode("");
            setStep("code");
        } catch (error) {
            setErrors({ form: requestErrorKey(error) });
        }
    };

    const submitCode = async (event: FormEvent) => {
        event.preventDefault();
        if (code.length !== CODE_LENGTH) {
            setErrors({ code: "errors.required" });
            return;
        }

        try {
            const { valid } = await checkCode({ email: email.trim(), code });
            if (!valid) {
                setErrors({ code: "recovery.invalidCode" });
                return;
            }
            setErrors({});
            setStep("password");
        } catch (error) {
            setErrors({ form: requestErrorKey(error) });
        }
    };

    const submitPassword = async (event: FormEvent) => {
        event.preventDefault();
        const nextErrors: RecoveryErrors = { password: passwordError(password), confirm: confirmPasswordError(password, confirm) };
        setErrors(nextErrors);
        if (nextErrors.password || nextErrors.confirm) return;

        try {
            await resetPassword({ email: email.trim(), code, password });
            setStep("done");
        } catch (error) {
            if (httpStatus(error) === 400) {
                setCode("");
                setStep("code");
                setErrors({ code: "recovery.invalidCode" });
                return;
            }
            setErrors({ form: requestErrorKey(error) });
        }
    };

    const resend = () => {
        setErrors({});
        sendCode().catch((error: unknown) => setErrors({ form: requestErrorKey(error) }));
    };

    const formError = errors.form && (
        <p role="alert" className="text-center text-sm text-status-danger">
            {t(errors.form)}
        </p>
    );

    const backToLogin = (
        <Link href={withNext("/login")} className="mt-[30px] block text-center text-xs text-primary hover:underline">
            {t("recovery.back")}
        </Link>
    );

    if (step === "done") {
        return (
            <AuthLayout scene="recovery" title={t("recovery.doneTitle")} subtitle={t("recovery.doneText")}>
                <Link
                    href={withNext("/login")}
                    className="flex h-[45px] w-full items-center justify-center rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90"
                >
                    {t("recovery.toLogin")}
                </Link>
            </AuthLayout>
        );
    }

    if (step === "password") {
        return (
            <AuthLayout scene="recovery" title={t("recovery.newTitle")} subtitle={t("recovery.newText")}>
                <form noValidate onSubmit={submitPassword} className="flex flex-col gap-3">
                    <AuthField
                        label={t("fields.newPassword")}
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("fields.newPasswordPlaceholder")}
                        value={password}
                        onChange={setPassword}
                        error={errors.password && t(errors.password)}
                    />
                    <AuthField
                        label={t("fields.confirmPassword")}
                        type="password"
                        autoComplete="new-password"
                        placeholder={t("fields.confirmPasswordPlaceholder")}
                        value={confirm}
                        onChange={setConfirm}
                        error={errors.confirm && t(errors.confirm)}
                    />
                    <PasswordRequirements password={password} />
                    {formError}
                    <AuthSubmit loading={isResetting}>{t("recovery.submit")}</AuthSubmit>
                </form>
                {backToLogin}
            </AuthLayout>
        );
    }

    if (step === "code") {
        return (
            <AuthLayout scene="recovery" title={t("recovery.checkTitle")} subtitle={t("recovery.checkText", { email: email.trim() })}>
                <form noValidate onSubmit={submitCode} className="flex flex-col gap-3">
                    <CodeStep
                        length={CODE_LENGTH}
                        value={code}
                        onChange={setCode}
                        error={errors.code && t(errors.code)}
                        resendLeft={cooldown.left}
                        onResend={resend}
                    />
                    {formError}
                    <AuthSubmit loading={isChecking}>{t("recovery.continue")}</AuthSubmit>
                </form>
                {backToLogin}
            </AuthLayout>
        );
    }

    return (
        <AuthLayout scene="recovery" title={t("recovery.title")} subtitle={t("recovery.subtitle")}>
            <form noValidate onSubmit={submitEmail} className="flex flex-col gap-3">
                <AuthField
                    label={t("fields.email")}
                    type="email"
                    autoComplete="email"
                    placeholder={t("fields.emailPlaceholder")}
                    value={email}
                    onChange={setEmail}
                    error={errors.email && t(errors.email)}
                />
                {formError}
                <AuthSubmit loading={isRequesting}>{t("recovery.send")}</AuthSubmit>
            </form>
            {backToLogin}
        </AuthLayout>
    );
}
