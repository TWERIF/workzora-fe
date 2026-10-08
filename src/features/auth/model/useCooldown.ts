import { useCallback, useEffect, useState } from "react";

export const useCooldown = (seconds: number) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (left <= 0) return;
        const timer = window.setTimeout(() => setLeft((value) => value - 1), 1000);
        return () => window.clearTimeout(timer);
    }, [left]);

    const start = useCallback(() => setLeft(seconds), [seconds]);

    return { left, start, active: left > 0 };
};
