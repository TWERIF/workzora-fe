import { ReactNode } from "react";
import IconBGTriangles from "../../svg/IconBGTriangles";
import LogoWhite from "../../svg/LogoWhite";

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
                    <div className="absolute bottom-[23px] right-[280px]">
                        <LogoWhite />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}