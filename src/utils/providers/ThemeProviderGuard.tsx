import { useEffect, useState } from 'react'

export default function ThemeProviderGuard({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const init = () => {
            setMounted(true);
        };

        init();
    }, []);

    if (!mounted) return null;
    return <>{children}</>
}