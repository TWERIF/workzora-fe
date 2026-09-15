import { useAuth } from "@/features/auth/model/useAuth";
import FinancesPage from "@/features/finances/ui/FinancesPage";


export default function Finances() {
    const { user } = useAuth();
    return <FinancesPage userId={user?.id ?? ""} />;
}