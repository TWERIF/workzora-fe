import { useAuth } from "@/features/auth/model/useAuth";
import { ReactNode } from "react";

export default function Can({ roles, children }: { roles: string[], children: ReactNode }) {
    const { user } = useAuth();
    return (
        <>
            {roles.includes(user?.role!) ? children : <></>}
        </>
    )
}