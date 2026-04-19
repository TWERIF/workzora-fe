"use client";

import { confirmEmail } from "@/features/auth/model/api";
import { User } from "@/features/auth/model/types";
import { useAuth } from "@/features/auth/model/useAuth";
import AccountSettings from "@/features/profile/ui/AccountSettings";
import BankVerification from "@/features/profile/ui/BankVerification";
import VerificationAccount from "@/features/profile/ui/VerificationAccount";
import { useUsers } from "@/features/users/model/useUsers";
import IconEdit from "@/shared/components/svg/IconEdit";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import InputEdit from "@/shared/components/ui/Input/InputEdit";
import ConfirmEmail from "@/shared/components/ui/Input/ConfirmEmail"; // Переконайтеся, що шлях правильний
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileSettings() {
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateMutaion } = useUsers();
  const isDark = theme === "dark";

  const [isEmailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [code, setCode] = useState(""); // Стан для OTP коду

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      reserveEmail: user?.reserveEmail || "",
    },
  });

  const emailValue = watch("email");

  // Функція ініціації відправки листа (передається в ConfirmEmail)
  const sendMail = async () => {
    setEmailError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError(t("errors.invalid_email"));
      return;
    }

    try {
      await confirmEmail(emailValue);
      alert(t("messages.code_sent"));
    } catch (err) {
      setEmailError(t("errors.send_failed"));
    }
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = (data: Partial<User>) => {
    toast.promise(
      updateMutaion.mutateAsync({
        id: user?.id,
        ...data,
      }),
      {
        loading: t("profilePage.messages.saving") || "Зберігання...",
        success: (
          <b>{t("profilePage.messages.success") || "Профіль оновлено!"}</b>
        ),
        error: (
          <b>{t("profilePage.messages.error") || "Помилка при збереженні."}</b>
        ),
      },
      {
        style: {
          borderRadius: "16px", // у стилі твоєї Workzora
          background: "#333",
          color: "#fff",
        },
      },
    );
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-[#2A2A2A] py-8 text-white" : "bg-[#F7F7F7] text-[#333333]"}`}
    >
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-3xl font-bold my-10">{t("profilePage.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-12">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputEdit
                  label={t("profilePage.form.firstname")}
                  placeholder={t("profilePage.form.firstname_placeholder")}
                  icon={<IconEdit />}
                  {...register("firstName")}
                />
                <InputEdit
                  label={t("profilePage.form.lastname")}
                  placeholder={t("profilePage.form.lastname_placeholder")}
                  icon={<IconEdit />}
                  {...register("lastName")}
                />
                <div className="md:col-span-2">
                  <InputEdit
                    label={t("profilePage.form.username")}
                    placeholder={t("profilePage.form.username_placeholder")}
                    icon={<IconEdit />}
                    isFullWidth
                    {...register("username")}
                  />
                </div>

                <div className="md:col-span-1">
                  <InputEdit
                    label={t("profilePage.form.email")}
                    type="email"
                    placeholder={t("profilePage.form.email_placeholder")}
                    icon={<IconEdit />}
                    {...register("email")}
                  />

                  {/* Логіка відображення блоку підтвердження коду */}
                  {emailValue && emailValue !== user?.email && !isEmailValid ? (
                    <div className="mt-4">
                      <ConfirmEmail
                        placeholder={t("auth.placeholders.code")}
                        value={code}
                        setValue={setCode}
                        sendMail={sendMail}
                        email={emailValue}
                        setMailConfirmed={setEmailValid}
                        mailConfirmed={isEmailValid}
                      />
                    </div>
                  ) : null}
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                <InputEdit
                  label={t("profilePage.form.confirm_email")}
                  placeholder={t("profilePage.form.email_placeholder")}
                  {...register("reserveEmail")}
                />

                <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
                  <span className="text-sm font-semibold opacity-0 hidden md:block">
                    spacer
                  </span>
                  <ButtonGradient
                    text={t("profilePage.form.save")}
                    type="submit"
                    disabled={updateMutaion.isPending}
                  />
                </div>
              </div>
            </form>

            <div className="w-full">
              <VerificationAccount />
            </div>
            <div className="w-full">
              <BankVerification />
            </div>
          </div>

          <aside className="order-1 lg:order-2 lg:col-span-4 w-full">
            <div className="sticky top-8">
              <AccountSettings />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
