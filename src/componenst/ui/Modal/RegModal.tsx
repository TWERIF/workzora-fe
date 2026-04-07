import { $api } from "@/componenst/http";
import IconApple from "@/componenst/svg/IconApple";
import IconAppleDark from "@/componenst/svg/IconAppleDark";
import IconFacebook from "@/componenst/svg/IconFacebook";
import IconGoogle from "@/componenst/svg/IconGoogle";
import Logo from "@/componenst/svg/Logo";
import LogoRegWhite from "@/componenst/svg/LogoRegWhite";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/utils/validators";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGradient from "../Button/ButtonGradient";
import ButtonSocial from "../Button/ButtonSocial";
import ConfirmEmail from "../Input/ConfirmEmail";
import Input from "../Input/Input";
import Or from "../Separators/Or";
import Modal from "./Modal";
import Line from "../Separators/Line";
import Submit from "../Input/Submit";
import Link from "../Link/LinkHeader";
import GoogleLoginButton from "../Button/GoogleLoginButton";

interface ModalI {
    maxWidth: number;
    setIsOpen: (s: boolean) => void;
    setIsOpenLogin: (s: boolean) => void;
}
export default function RegModal(props: ModalI) {
    const {
        setIsOpen,
        setIsOpenLogin,
        maxWidth
    } = props;
    const { theme } = useTheme();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [submit, setSubmit] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);
    const locale = i18n.language;
    const router = useRouter()


    const sendMail = async () => {
        if (!validateEmailTmp()) return;
        await $api.post('/auth/confirm-email', { email });
    }

    const validateEmailTmp = (): boolean => {
        const emailErrorKey = validateEmail(email);
        const tmpErrors = [...errors];
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

        if (!submit)
            tmpErrors[6] = t('auth.errors.submitRules');


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

        if (res) router.push(`/${locale}/profile`);
    }

    useEffect(() => {
        if (email.trim().length && errors[3]) validateEmailTmp();
    }, [email]);

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    if (!ready) return null;
    return (
        <Modal setIsOpen={setIsOpen} maxWidth={maxWidth}>
            <div className="w-full flex items-center flex-col gap-[12px]">
                {theme === "dark" ? <LogoRegWhite /> : <Logo />}
                <span className="text-text dark:text-text-dark font-semibold">{t("auth.placeholders.signIn")}</span>
                <GoogleLoginButton />
                <ButtonSocial text={<div className="flex justify-between items-center"><IconFacebook /> {t("auth.buttons.facebook")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <ButtonSocial text={<div className="flex justify-between items-center">{theme === "dark" ? <IconAppleDark /> : <IconApple />} {t("auth.buttons.apple")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <Or />
                <form method="post" className="w-full flex flex-col gap-[14px] mb-5">
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
                    <div className="mt-[15px] mb-[26px]">
                        <Submit
                            value={submit}
                            setValue={setSubmit}
                            errorText={errors[6]}
                            text={
                                <span className="whitespace-normal break-words">
                                    {t("auth.texts.agree")}
                                    <Link form href="/agreement" text={" " + t("auth.texts.user") + " "} />
                                    {t("auth.texts.and")}
                                    <Link form href="/privacy" text={" " + t("auth.texts.privacy")} />
                                </span>
                            }
                        />
                    </div>
                    <ButtonGradient type="button" text={t("auth.buttons.join")} onClick={register} />
                </form>
                <Line />
                <span className="whitespace-normal break-words">
                    {t("separators.haveAnAccountText")}
                    <Link onClick={()=>{setIsOpen(false);setIsOpenLogin(true)}} form href="#" text={" " + t("separators.haveAnAccountLink") + " "} />
                </span>
            </div>
        </Modal>
    )
}