import IconBGTriangles from "@/componenst/svg/IconBGTriangles";
import IconDog from "@/componenst/svg/IconDog";
import LogoWhite from "@/componenst/svg/LogoWhite";
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