
import IconApple from "@/shared/components/svg/IconApple";
import IconAppleDark from "@/shared/components/svg/IconAppleDark";
import IconFacebook from "@/shared/components/svg/IconFacebook";
import IconGoogle from "@/shared/components/svg/IconGoogle";
import Logo from "@/shared/components/svg/Logo";
import LogoRegWhite from "@/shared/components/svg/LogoRegWhite";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import ButtonSocial from "@/shared/components/ui/Button/ButtonSocial";
import Input from "@/shared/components/ui/Input/Input";
import Submit from "@/shared/components/ui/Input/Submit";
import Modal from "@/shared/components/ui/Modal/Modal";
import Line from "@/shared/components/ui/Separators/Line";
import Or from "@/shared/components/ui/Separators/Or";
import { validatePassword } from "@/utils/validators";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../model/useAuth";


interface ModalI {
    maxWidth: number;
    setIsOpen: (s: boolean) => void;
    setIsOpenReg: (s: boolean) => void;
}
export default function LoginModal(props: ModalI) {
    const { setIsOpen, maxWidth, setIsOpenReg } = props;
    const { theme } = useTheme();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState<{ email?: string, password?: string, global?: string }>({});

    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);

    // Дістаємо loginError для відображення помилок з бекенду
    const { login, isLoggingIn } = useAuth();

    const validate = () => {
        const tmpErrors: typeof errors = {};

        if (!userName.trim()) {
            tmpErrors.email = t("auth.errors.required");
        }

        const passwordErrorKey = validatePassword(password);
        if (passwordErrorKey) {
            tmpErrors.password = t(passwordErrorKey);
        }

        setErrors(tmpErrors);
        return Object.keys(tmpErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            const res = await login({
                password,
                email: userName,
            });

            // Якщо логін успішний (хук повертає дані)
            if (res) {
                setIsOpen(false); // Закриваємо модалку
            }
        } catch (err) {
            setErrors({ global: err?.response?.data?.message || "Login failed" });
        }
    };

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    if (!ready) return null;

    return (
        <Modal setIsOpen={setIsOpen} maxWidth={maxWidth}>
            <div className="w-full flex items-center flex-col gap-[12px]">
                {theme === "dark" ? <LogoRegWhite /> : <Logo />}
                <span className="text-text dark:text-text-dark font-semibold">{t("auth.placeholders.welcome")}</span>

                {/* Social Buttons */}
                <ButtonSocial text={<div className="flex justify-between items-center"><IconGoogle /> {t("auth.buttons.google")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <ButtonSocial text={<div className="flex justify-between items-center"><IconFacebook /> {t("auth.buttons.facebook")} <div className="w-[30px]"></div></div>} onClick={() => { }} />
                <ButtonSocial text={<div className="flex justify-between items-center">{theme === "dark" ? <IconAppleDark /> : <IconApple />} {t("auth.buttons.apple")} <div className="w-[30px]"></div></div>} onClick={() => { }} />

                <Or />

                <form className="w-full flex flex-col gap-[14px] mb-5" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <Input
                        errorText={errors.email}
                        value={userName}
                        setValue={setUserName}
                        placeholder={t("auth.placeholders.usernameoremail")}
                    />
                    <Input
                        errorText={errors.password}
                        value={password}
                        setValue={setPassword}
                        placeholder={t("auth.placeholders.password")}
                        password
                    />

                    {/* Вивід глобальної помилки (якщо невірний пароль) */}
                    {errors.global && <span className="text-red-500 text-sm text-center">{errors.global}</span>}

                    <Submit
                        value={submit}
                        setValue={setSubmit}
                        text={
                            <span className="whitespace-normal break-words flex w-full justify-between">
                                {t("auth.texts.remember")}
                                <Link href="/agreement" className="hover:underline cursor-pointer">
                                    {" " + t("auth.texts.forgot") + " "}
                                </Link>
                            </span>
                        }
                    />

                    <ButtonGradient
                        type="submit"
                        text={isLoggingIn ? "..." : t("profile.headers.login")}
                        onClick={handleLogin}
                        disabled={isLoggingIn} // Блокуємо кнопку під час запиту
                    />
                </form>

                {/* Footer Links */}
                <Line />
                <span className="whitespace-normal break-words text-center">
                    {t("separators.donthaveAnAccountText")}
                    <button
                        className="text-primary-lime hover:underline cursor-pointer ml-1"
                        onClick={() => { setIsOpen(false); setIsOpenReg(true); }}
                    >
                        {t("separators.donthaveAnAccountLink")}
                    </button>
                </span>
            </div>
        </Modal>
    );
}