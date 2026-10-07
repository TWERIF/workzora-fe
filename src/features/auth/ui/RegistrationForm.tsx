import { IconBriefcase, IconHandshake } from "@/shared/components/svg/AuthIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { httpStatus, requestErrorKey } from "../model/errors";
import type { UserCreate } from "../model/types";
import { useAuth } from "../model/useAuth";
import { useAuthRedirect } from "../model/useAuthRedirect";
import { useCooldown } from "../model/useCooldown";
import { useEmailVerification } from "../model/useEmailVerification";
import { emailError, passwordError, requiredError, splitFullName, usernameFromEmail } from "../model/validation";
import AuthField from "./AuthField";
import AuthLayout from "./AuthLayout";
import AuthSubmit from "./AuthSubmit";
import CodeStep from "./CodeStep";
import PasswordRequirements from "./PasswordRequirements";
import SocialSignIn from "./SocialSignIn";

type Role = UserCreate["role"];

interface RegistrationErrors {
    name?: string;
    email?: string;
    password?: string;
    terms?: string;
    code?: string;
    form?: string;
}

const CODE_LENGTH = 5;
const RESEND_SECONDS = 60;

function RoleOption({ checked, label, icon, onSelect }: { checked: boolean; label: string; icon: ReactNode; onSelect: () => void }) {
    return (
        <label
            className={`flex h-[70px] min-w-0 cursor-pointer items-center gap-2 rounded-20 border px-3 text-sm transition-colors sm:gap-2.5 sm:px-5 ${
                checked ? "border-primary/30 bg-primary-10" : "border-main-10 hover:border-primary/30"
            }`}
        >
            <input type="radio" name="role" checked={checked} onChange={onSelect} className="peer sr-only" />
            <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${
                    checked ? "border-primary" : "border-main-10"
                }`}
            >
                {checked && <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
            <span className={`hidden shrink-0 min-[380px]:block ${checked ? "text-primary" : "text-main-50"}`}>{icon}</span>
        </label>
    );
}

export default function RegistrationForm() {
    const { t } = useTranslation("auth");
    const { locale = "en" } = useRouter();
    const { register, isRegistering } = useAuth();
    const { sendCode, verifyCode, isSending, isVerifying } = useEmailVerification();
    const { redirectAfterAuth, withNext } = useAuthRedirect();
    const cooldown = useCooldown(RESEND_SECONDS);

    const [step, setStep] = useState<"form" | "code">("form");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>("client");
    const [terms, setTerms] = useState(false);
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState<RegistrationErrors>({});

    const requestCode = async () => {
        await sendCode({ email: email.trim(), locale });
        cooldown.start();
    };

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        const nextErrors: RegistrationErrors = {
            name: requiredError(name),
            email: emailError(email),
            password: passwordError(password),
            terms: terms ? undefined : "errors.terms",
        };
        setErrors(nextErrors);
        if (Object.values(nextErrors).some(Boolean)) return;

        try {
            await requestCode();
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

        const verified = await verifyCode({ email: email.trim(), code: Number(code) }).catch(() => null);
        if (!verified?.success) {
            setErrors({ code: "registration.invalidCode" });
            return;
        }

        try {
            await register({
                ...splitFullName(name),
                email: email.trim(),
                password,
                userName: usernameFromEmail(email),
                locale,
                role,
            });
            redirectAfterAuth();
        } catch (error) {
            setErrors({ form: httpStatus(error) === 409 ? "registration.exists" : requestErrorKey(error) });
        }
    };

    const resend = () => {
        setErrors({});
        requestCode().catch((error: unknown) => setErrors({ form: requestErrorKey(error) }));
    };

    const formError = errors.form && (
        <p role="alert" className="text-center text-sm text-status-danger">
            {t(errors.form)}
        </p>
    );

    if (step === "code") {
        return (
            <AuthLayout scene="registration" title={t("registration.checkTitle")} subtitle={t("registration.checkText", { email: email.trim() })}>
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
                    <AuthSubmit loading={isVerifying || isRegistering}>{t("registration.confirm")}</AuthSubmit>
                    <button type="button" onClick={() => setStep("form")} className="text-xs text-main-50 hover:text-primary">
                        {t("recovery.back")}
                    </button>
                </form>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout scene="registration" title={t("registration.title")} subtitle={t("registration.subtitle")}>
            <form noValidate onSubmit={submitForm} className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                    <AuthField
                        label={t("fields.name")}
                        autoComplete="name"
                        placeholder={t("fields.namePlaceholder")}
                        value={name}
                        onChange={setName}
                        error={errors.name && t(errors.name)}
                    />
                    <AuthField
                        label={t("fields.email")}
                        type="email"
                        autoComplete="email"
                        placeholder={t("fields.emailPlaceholder")}
                        value={email}
                        onChange={setEmail}
                        error={errors.email && t(errors.email)}
                    />
                </div>
                <AuthField
                    label={t("fields.password")}
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("fields.passwordPlaceholder")}
                    value={password}
                    onChange={setPassword}
                    error={errors.password && t(errors.password)}
                />
                {password && <PasswordRequirements password={password} />}

                <fieldset className="flex flex-col gap-1.5">
                    <legend className="mb-1.5 text-sm leading-[26px]">{t("registration.joinAs")}</legend>
                    <div className="grid grid-cols-2 gap-3">
                        <RoleOption checked={role === "client"} label={t("registration.client")} icon={<IconBriefcase />} onSelect={() => setRole("client")} />
                        <RoleOption checked={role === "freelancer"} label={t("registration.freelancer")} icon={<IconHandshake />} onSelect={() => setRole("freelancer")} />
                    </div>
                </fieldset>

                <label className="flex cursor-pointer items-start gap-2 text-xs leading-5">
                    <input
                        type="checkbox"
                        checked={terms}
                        onChange={(event) => setTerms(event.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span>
                        {t("registration.agree")}{" "}
                        <Link href="/terms-and-conditions" target="_blank" className="text-primary hover:underline">
                            {t("registration.terms")}
                        </Link>{" "}
                        {t("registration.and")}{" "}
                        <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline">
                            {t("registration.privacy")}
                        </Link>
                    </span>
                </label>
                {errors.terms && <span className="-mt-2 text-xs text-status-danger">{t(errors.terms)}</span>}
                {formError}
                <AuthSubmit loading={isSending}>{t("registration.submit")}</AuthSubmit>
            </form>

            <SocialSignIn onSuccess={redirectAfterAuth} />

            <p className="mt-[30px] text-center text-xs text-main-50">
                {t("registration.haveAccount")}{" "}
                <Link href={withNext("/login")} className="text-primary hover:underline">
                    {t("registration.login")}
                </Link>
            </p>
        </AuthLayout>
    );
}
