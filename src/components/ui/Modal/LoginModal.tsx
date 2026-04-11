import { $api } from "@/components/http";
import IconApple from "@/components/svg/IconApple";
import IconAppleDark from "@/components/svg/IconAppleDark";
import IconFacebook from "@/components/svg/IconFacebook";
import IconGoogle from "@/components/svg/IconGoogle";
import Logo from "@/components/svg/Logo";
import LogoRegWhite from "@/components/svg/LogoRegWhite";
import { validatePassword } from "@/utils/validators";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonGradient from "../Button/ButtonGradient";
import ButtonSocial from "../Button/ButtonSocial";
import Input from "../Input/Input";
import Submit from "../Input/Submit";
import Line from "../Separators/Line";
import Or from "../Separators/Or";
import Modal from "./Modal";
import Link from "../Link/LinkHeader";

interface ModalI {
    maxWidth: number;
    setIsOpen: (s: boolean) => void;
    setIsOpenReg: (s: boolean) => void;
}
export default function LoginModal(props: ModalI) {
    const {
        setIsOpen,
        maxWidth,
        setIsOpenReg
    } = props;
    const { theme } = useTheme();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);
    const locale = i18n.language;
    const router = useRouter()


    const validate = () => {
        const tmpErrors: string[] = [];

        if (!userName.trim()) tmpErrors[2] = t("auth.errors.required");

        const passwordErrorKey = validatePassword(password);
        tmpErrors[4] = passwordErrorKey ? t(passwordErrorKey) : "";


        setErrors(tmpErrors);
        return tmpErrors.every(e => !e);
    };

    const login = async () => {
        if (!validate()) return;
        console.log(password, userName)
        const res = await $api.post('/auth/login', {
            password,
            email: userName,
        });

        if (res) router.push(`/${locale}/profile`);
    }

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    if (!ready) return null;
    return (
        <Modal setIsOpen={setIsOpen} maxWidth={maxWidth}>
            <div className="w-full flex items-center flex-col gap-[12px]">
                {theme === "dark" ? <LogoRegWhite /> : <Logo />}
                <span className="text-text dark:text-text-dark font-semibold">{t("auth.placeholders.welcome")}</span>
                <ButtonSocial text={<div className="flex justify-between items-center"><IconGoogle /> {t("auth.buttons.google")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <ButtonSocial text={<div className="flex justify-between items-center"><IconFacebook /> {t("auth.buttons.facebook")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <ButtonSocial text={<div className="flex justify-between items-center">{theme === "dark" ? <IconAppleDark /> : <IconApple />} {t("auth.buttons.apple")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <Or />
                <form method="post" className="w-full flex flex-col gap-[14px] mb-5">
                    <Input errorText={errors[0]} value={userName} setValue={setUserName} placeholder={t("auth.placeholders.usernameoremail")} />
                    <Input errorText={errors[1]} value={password} setValue={setPassword} placeholder={t("auth.placeholders.password")} password />
                    <Submit
                        value={submit}
                        setValue={setSubmit}
                        errorText={errors[6]}
                        text={
                            <span className="whitespace-normal break-words flex w-full justify-between">
                                {t("auth.texts.remember")}
                                <Link form href="/agreement" text={" " + t("auth.texts.forgot") + " "} />
                            </span>
                        }
                    />
                    <ButtonGradient type="button" text={t("profile.headers.login")} onClick={login} />
                    <span className="whitespace-normal break-words">
                        {t("auth.texts.protected")}
                        <Link form href="/agreement" text={" " + t("auth.texts.user") + " "} />
                        {t("auth.texts.and")}
                        <Link form href="/privacy" text={" " + t("auth.texts.privacy")} />
                        {" "}
                        {t("auth.texts.apply")}.
                    </span>
                </form>
                <Line />
                <span className="whitespace-normal break-words">
                    {t("separators.donthaveAnAccountText")}
                    <Link form onClick={() => { setIsOpen(false); setIsOpenReg(true) }} href="#" text={" " + t("separators.donthaveAnAccountLink") + " "} />

                </span>
            </div>
        </Modal>
    )
}