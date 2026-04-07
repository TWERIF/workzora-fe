import IconBGTriangles from "@/components/svg/IconBGTriangles";
import IconDog from "@/components/svg/IconDog";
import LogoWhite from "@/components/svg/LogoWhite";
import { ReactNode } from "react"

interface LayoutI {
    children: ReactNode;
}
export default function AuthLayout(props: LayoutI) {
    const { children } = props;
    return (
        <div className="w-full h-[100vh] bg-success relative overflow-hidden flex">
            <div className="absolute top-0 right-0">
                <IconBGTriangles />
            </div>
            <div className="absolute bottom-0 right-0 flex">
                <div className="relative">
                    <IconDog />
                    <div className="absolute bottom-[23px] right-[280px]">
                        <LogoWhite />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}