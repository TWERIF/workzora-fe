import ScrollRow from "@/shared/components/ui/ScrollRow";
import React, { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface StickyNavProps {
  items: NavItem[];
  offset?: number;
}

export default function StickyNav({ items, offset = 100 }: StickyNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = items.length - 1; i >= 0; i--) {
        const section = document.getElementById(items[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, offset]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - offset + 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollRow wrapperClassName="sticky top-4 z-40 max-w-fit" className="flex items-center gap-2 rounded-full border border-border bg-bg-header/80 px-15 py-3 backdrop-blur-md dark:bg-bg-modalDark/80">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          aria-current={activeId === item.id ? "true" : undefined}
          className={`whitespace-nowrap px-15 py-13 rounded-full text-sm font-medium transition-all ${
            activeId === item.id
              ? "bg-success text-text-dark shadow-md"
              : "text-text-muted hover:text-text dark:hover:text-text-dark hover:bg-bg dark:hover:bg-bg-dark"
          }`}
        >
          {item.label}
        </a>
      ))}
    </ScrollRow>
  );
}