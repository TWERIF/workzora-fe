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
    <div className="sticky top-4 z-40 bg-bg-header/80 dark:bg-bg-modalDark/80 backdrop-blur-md py-3 px-15 rounded-full border border-border flex items-center max-w-fit gap-2 overflow-x-auto no-scrollbar">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`whitespace-nowrap px-15 py-13 rounded-full text-sm font-medium transition-all ${
            activeId === item.id
              ? "bg-success text-text-dark shadow-md"
              : "text-text-muted hover:text-text dark:hover:text-text-dark hover:bg-bg dark:hover:bg-bg-dark"
          }`}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}