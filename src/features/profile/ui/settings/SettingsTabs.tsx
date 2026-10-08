import ScrollRow from "@/shared/components/ui/ScrollRow";
import { useEffect, useState, type MouseEvent } from "react";

interface SettingsTab {
    id: string;
    label: string;
}

const HEADER_OFFSET = 220;

export default function SettingsTabs({ items }: { items: SettingsTab[] }) {
    const [activeId, setActiveId] = useState(items[0]?.id ?? "");

    useEffect(() => {
        const update = () => {
            const position = window.scrollY + HEADER_OFFSET;
            let current = items[0]?.id ?? "";
            for (const item of items) {
                const section = document.getElementById(item.id);
                if (section && section.offsetTop <= position) current = item.id;
            }
            setActiveId(current);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, [items]);

    const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        const section = document.getElementById(id);
        if (!section) return;
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 40, behavior: "smooth" });
        setActiveId(id);
    };

    return (
        <ScrollRow as="nav" wrapperClassName="sticky top-[112px] z-30" className="rounded-full bg-main-5/95 p-2.5 backdrop-blur">
            <ul className="flex min-w-max gap-2.5">
                {items.map((item) => (
                    <li key={item.id} className="flex-1">
                        <a
                            href={`#${item.id}`}
                            onClick={(event) => go(event, item.id)}
                            aria-current={activeId === item.id ? "true" : undefined}
                            className={`flex h-[50px] items-center justify-center whitespace-nowrap rounded-full px-5 text-sm transition-colors sm:px-6 ${
                                activeId === item.id ? "bg-primary text-white" : "bg-background hover:text-primary"
                            }`}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </ScrollRow>
    );
}
