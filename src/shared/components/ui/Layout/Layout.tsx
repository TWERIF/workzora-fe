import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { TrianglesBg } from "../../svg/TrianglesBg";

export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <>
            {/* {router.pathname !== "/" && <div className="absolute top-0 ">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <TrianglesBg />
                </div>
            </div>} */}
            {children}
        </>
    )
}