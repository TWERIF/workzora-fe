import { useAuth } from "@/features/auth/model/useAuth";
import ProfileSettings from "@/features/profile/ui/ProfileSettings";
import Loader from "@/shared/components/ui/Loader";

export default function ProfileSettingsPage() {
  const { user, isLoading: userLoading } = useAuth();


  if (userLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <ProfileSettings user={user} />;
}