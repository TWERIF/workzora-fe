'use client';

import { $api } from "@/components/http";
import Logo from "@/components/svg/Logo";
import LogoRegWhite from "@/components/svg/LogoRegWhite";
import ButtonGradient from "@/components/ui/Button/ButtonGradient";
import ConfirmEmail from "@/components/ui/Input/ConfirmEmail";
import Input from "@/components/ui/Input/Input";
import AuthLayout from "@/components/ui/Layout/AuthLayout";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/utils/validators";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);
    const locale = i18n.language;
    const { theme } = useTheme();
    const router = useRouter()

    const sendMail = async () => {
        if (!validateEmailTmp()) return;
        await $api.post('/auth/confirm-email', { email });
    }

    const validateEmailTmp = (): boolean => {
        const emailErrorKey = validateEmail(email);
        const tmpErrors = [...errors]; // беремо поточні помилки, щоб не губити інші
        if (emailErrorKey) {
            tmpErrors[3] = t(emailErrorKey);
            setErrors(tmpErrors);
            console.log("Email validation: false");
            return false;
        }
        tmpErrors[3] = "";
        setErrors(tmpErrors);
        return true;
    }

    const validate = () => {
        const tmpErrors: string[] = [];

        if (!firstName.trim()) tmpErrors[0] = t("auth.errors.required");
        if (!lastName.trim()) tmpErrors[1] = t("auth.errors.required");
        if (!userName.trim()) tmpErrors[2] = t("auth.errors.required");

        const emailErrorKey = validateEmail(email);
        tmpErrors[3] = emailErrorKey ? t(emailErrorKey) : "";

        const passwordErrorKey = validatePassword(password);
        tmpErrors[4] = passwordErrorKey ? t(passwordErrorKey) : "";

        const confirmErrorKey = validateConfirmPassword(password, confirmPassword);
        tmpErrors[5] = confirmErrorKey ? t(confirmErrorKey) : "";

        setErrors(tmpErrors);

        return tmpErrors.every(e => !e);
    };

    const register = async () => {
        if (!validate() && !isActive) return;

        const res = await $api.post('/auth/register', {
            firstName,
            lastName,
            password,
            email,
            userName,
            locale,
            isActive
        });

        if (res) router.push(`/${locale}/reserve-email`);
    }

    useEffect(() => {
        if (email.trim().length && errors[3]) validateEmailTmp();
    }, [email]);

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    if (!ready) return null;
    return (
        <>
            <Head>
                <title>Workzora | Registration</title>
                <meta name="description" content="Workzora | Registration" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthLayout>
                <div className="flex-1 max-w-[50%] bg-bg opacity-1 z-10 flex flex-col items-end justify-center dark:bg-bg-dark">
                    <div className="flex flex-col items-center gap-[30px] mr-[77px]">
                        {theme === "dark" ? <LogoRegWhite /> : <Logo />}
                        <form method="post" className="w-full flex flex-col gap-[14px]">
                            <div className="flex gap-[30px]">
                                <Input errorText={errors[0]} value={firstName} setValue={setFirstName} placeholder={t("auth.placeholders.name")} />
                                <Input errorText={errors[1]} value={lastName} setValue={setLastName} placeholder={t("auth.placeholders.surname")} />
                            </div>
                            <Input errorText={errors[2]} value={userName} setValue={setUserName} placeholder={t("auth.placeholders.username")} />
                            <Input errorText={errors[3]} value={email} setValue={setEmail} placeholder={t("auth.placeholders.email")} />
                            {(email.length && !isActive) ? <ConfirmEmail
                                placeholder={t("auth.placeholders.code")}
                                value={code}
                                setValue={setCode}
                                sendMail={sendMail}
                                email={email}
                                setMailConfirmed={setIsActive}
                                mailConfirmed={isActive}
                            /> : <></>}
                            <Input errorText={errors[4]} value={password} setValue={setPassword} placeholder={t("auth.placeholders.password")} password />
                            <Input errorText={errors[5]} value={confirmPassword} setValue={setConfirmPassword} placeholder={t("auth.placeholders.confirmPassword")} password />
                            <div className="mt-[40px] "></div>
                            <ButtonGradient type="button" text={t("auth.buttons.next")} onClick={register} />
                        </form>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
