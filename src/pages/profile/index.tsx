import { useAuth } from "@/features/auth/model/useAuth";
import MyProfile from "@/features/profile/ui/MyProfile";
import Loader from "@/shared/components/ui/Loader";

export default function ProfilePage() {
  const { user, isLoading: userLoading } = useAuth();


  if (userLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <MyProfile user={user} />;
}
