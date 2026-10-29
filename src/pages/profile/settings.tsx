import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { useAuth } from "@/features/auth/model/useAuth";
import ProfileSettings from "@/features/profile/ui/ProfileSettings";
import Loader from "@/shared/components/ui/Loader";

function ProfileSettingsPageContent() {
  const { user, isLoading: userLoading } = useAuth();


  if (userLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <ProfileSettings user={user} />;
}

export default function ProfileSettingsPage() {
  return (
    <ProtectedRoute>
      <ProfileSettingsPageContent />
    </ProtectedRoute>
  );
}
