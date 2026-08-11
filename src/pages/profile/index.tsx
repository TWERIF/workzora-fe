import { useAuth } from "@/features/auth/model/useAuth";
import ProfileSettings from "@/features/profile/ui/ProfileSettings";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { user, isLoading: userLoading, logout } = useAuth();
  const { t, i18n } = useTranslation("profile");
  const locale = i18n.language;
  const router = useRouter();


  if (userLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <ProfileSettings user={user} t={t} locale={locale} logout={logout} router={router} />;
}