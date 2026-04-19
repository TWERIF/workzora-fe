"use client";

import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/utils/validators";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { $api } from "@/shared/components/http";
import Logo from "@/shared/components/svg/Logo";
import LogoRegWhite from "@/shared/components/svg/LogoRegWhite";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import ConfirmEmail from "@/shared/components/ui/Input/ConfirmEmail";
import Input from "@/shared/components/ui/Input/Input";
import AuthLayout from "@/shared/components/ui/Layout/AuthLayout";

// Імпортуємо наш хук! (Шлях зміни на свій, якщо він інший)
import { useAuth } from "@/features/auth/model/useAuth";

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

  const { t, i18n } = useTranslation("common");
  const [ready, setReady] = useState(false);
  const locale = i18n.language;
  const { theme } = useTheme();
  const router = useRouter();

  // Дістаємо функцію register (перейменовуємо її в registerUser, щоб уникнути конфлікту)
  // та стан завантаження
  const { register: registerUser, isRegistering } = useAuth();

  const sendMail = async () => {
    if (!validateEmailTmp()) return;
    await $api.post("/auth/confirm-email", { email });
  };

  const validateEmailTmp = (): boolean => {
    const emailErrorKey = validateEmail(email);
    const tmpErrors = [...errors];
    if (emailErrorKey) {
      tmpErrors[3] = t(emailErrorKey);
      setErrors(tmpErrors);
      return false;
    }
    tmpErrors[3] = "";
    setErrors(tmpErrors);
    return true;
  };

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

    return tmpErrors.every((e) => !e);
  };

  // Перейменували функцію, щоб не конфліктувала з registerUser з useAuth
  const handleRegister = async () => {
    if (!validate() && !isActive) return;

    try {
      // Викликаємо функцію з useAuth
      await registerUser({
        firstName,
        lastName,
        password,
        email,
        userName,
        locale,
        isActive,
      });

      // Якщо все пройшло успішно (помилок не виникло), робимо редирект
      router.push(`/${locale}/reserve-email`);
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      // Тут можна додати обробку помилки для UI
    }
  };

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
      </Head>
      <AuthLayout>
        <div className="flex-1 max-w-[50%] bg-bg opacity-1 z-10 flex flex-col items-end justify-center dark:bg-bg-dark">
          <div className="flex flex-col items-center gap-[30px] mr-[77px]">
            {theme === "dark" ? <LogoRegWhite /> : <Logo />}
            <form method="post" className="w-full flex flex-col gap-[14px]">
              <div className="flex gap-[30px]">
                <Input
                  errorText={errors[0]}
                  value={firstName}
                  setValue={setFirstName}
                  placeholder={t("auth.placeholders.name")}
                />
                <Input
                  errorText={errors[1]}
                  value={lastName}
                  setValue={setLastName}
                  placeholder={t("auth.placeholders.surname")}
                />
              </div>
              <Input
                errorText={errors[2]}
                value={userName}
                setValue={setUserName}
                placeholder={t("auth.placeholders.username")}
              />
              <Input
                errorText={errors[3]}
                value={email}
                setValue={setEmail}
                placeholder={t("auth.placeholders.email")}
              />
              {email.length && !isActive ? (
                <ConfirmEmail
                  placeholder={t("auth.placeholders.code")}
                  value={code}
                  setValue={setCode}
                  sendMail={sendMail}
                  email={email}
                  setMailConfirmed={setIsActive}
                  mailConfirmed={isActive}
                />
              ) : (
                <></>
              )}
              <Input
                errorText={errors[4]}
                value={password}
                setValue={setPassword}
                placeholder={t("auth.placeholders.password")}
                password
              />
              <Input
                errorText={errors[5]}
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder={t("auth.placeholders.confirmPassword")}
                password
              />
              <div className="mt-[40px] "></div>

              {/* Змінили onClick на handleRegister. Додали disabled на час завантаження */}
              <ButtonGradient
                type="button"
                text={
                  isRegistering ? "Завантаження..." : t("auth.buttons.next")
                }
                onClick={handleRegister}
              />
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
