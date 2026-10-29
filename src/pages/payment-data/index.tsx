import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { useAuth } from "@/features/auth/model/useAuth";
import FinancesPage from "@/features/finances/ui/FinancesPage";


function FinancesContent() {
    const { user } = useAuth();
    return <FinancesPage userId={user?.id ?? ""} />;
}

export default function Finances() {
    return (
        <ProtectedRoute>
            <FinancesContent />
        </ProtectedRoute>
    );
}
