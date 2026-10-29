import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { useAuth } from "@/features/auth/model/useAuth";
import MyProfile from "@/features/profile/ui/MyProfile";
import Loader from "@/shared/components/ui/Loader";

function ProfilePageContent() {
  const { user, isLoading: userLoading } = useAuth();


  if (userLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <MyProfile user={user} />;
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
