import { useState, useEffect } from "react";

export function useWindowWidth(): number {
    // starts at 0 on the client too, so the first render matches the server; set right after mount
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}
