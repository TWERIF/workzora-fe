import { $api } from "@/shared/components/http";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import Input from "@/shared/components/ui/Input/Input";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/utils/validators";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Step = "email" | "code" | "done";

export default function ForgotPassword() {
    const { t } = useTranslation("common");
    const { locale } = useRouter();

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [isSending, setIsSending] = useState(false);

    const requestCode = async () => {
        const emailError = validateEmail(email);
        if (emailError) {
            setErrors({ email: t(emailError) });
            return;
        }

        setErrors({});
        setIsSending(true);
        try {
            await $api.post("/auth/forgot-password", { email: email.trim(), locale });
            setStep("code");
        } catch {
            setErrors({ global: t("auth.reset.error") });
        } finally {
            setIsSending(false);
        }
    };

    const resetPassword = async () => {
        const passwordError = validatePassword(password);
        const confirmError = validateConfirmPassword(password, confirmPassword);
        const nextErrors = {
            code: code.trim() ? undefined : t("auth.errors.required"),
            password: passwordError ? t(passwordError) : undefined,
            confirmPassword: confirmError ? t(confirmError) : undefined,
        };
        setErrors(nextErrors);
        if (Object.values(nextErrors).some(Boolean)) return;

        setIsSending(true);
        try {
            await $api.post("/auth/reset-password", { email: email.trim(), code: code.trim(), password });
            setStep("done");
        } catch (error: any) {
            const status = error?.response?.status;
            setErrors({ global: t(status === 400 ? "auth.reset.invalidCode" : "auth.reset.error") });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Head>
                <title>{`${t("auth.reset.title")} — Workzora`}</title>
                <meta name="robots" content="noindex" />
            </Head>

            <section className="flex min-h-[70vh] items-center justify-center bg-bg px-4 py-28 dark:bg-bg-dark">
                <div className="flex w-full max-w-[440px] flex-col gap-4 rounded-22 bg-bg-header p-8 shadow-input dark:bg-bg-modalDark dark:shadow-input-dark">
                    <h1 className="text-center text-2xl font-semibold text-text dark:text-text-dark">
                        {t("auth.reset.title")}
                    </h1>

                    {step === "email" && (
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                requestCode();
                            }}
                        >
                            <p className="text-center text-sm text-text-muted">{t("auth.reset.emailStep")}</p>
                            <Input
                                value={email}
                                setValue={setEmail}
                                errorText={errors.email}
                                placeholder={t("auth.placeholders.email")}
                            />
                            {errors.global && <span className="text-center text-sm text-red-500">{errors.global}</span>}
                            <ButtonGradient type="submit" text={isSending ? "..." : t("auth.reset.send")} />
                        </form>
                    )}

                    {step === "code" && (
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                resetPassword();
                            }}
                        >
                            <p className="text-center text-sm text-text-muted">{t("auth.reset.codeStep")}</p>
                            <Input value={code} setValue={setCode} errorText={errors.code} placeholder={t("auth.placeholders.code")} />
                            <Input
                                value={password}
                                setValue={setPassword}
                                errorText={errors.password}
                                placeholder={t("auth.reset.newPassword")}
                                password
                            />
                            <Input
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                errorText={errors.confirmPassword}
                                placeholder={t("auth.placeholders.confirmPassword")}
                                password
                            />
                            {errors.global && <span className="text-center text-sm text-red-500">{errors.global}</span>}
                            <ButtonGradient type="submit" text={isSending ? "..." : t("auth.reset.save")} />
                            <button
                                type="button"
                                className="text-sm text-text-muted hover:underline"
                                onClick={requestCode}
                                disabled={isSending}
                            >
                                {t("auth.reset.resend")}
                            </button>
                        </form>
                    )}

                    {step === "done" && (
                        <>
                            <p className="text-center text-sm text-text dark:text-text-dark">{t("auth.reset.done")}</p>
                            <Link href="/?login=1" className="text-center text-success hover:underline">
                                {t("auth.reset.toLogin")}
                            </Link>
                        </>
                    )}

                    {step !== "done" && (
                        <Link href="/" className="text-center text-sm text-text-muted hover:underline">
                            {t("auth.reset.back")}
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}
