import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

// The server cannot know the visitor's theme, so pages are rendered in "light" there.
// Until the component mounts the client reports "light" too, which keeps hydration consistent;
// right after mount the real theme is returned. CSS `dark:` classes are applied by next-themes
// before paint, so only theme-dependent JS values (icon colors etc.) switch after mount.
export function useTheme() {
  const value = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted) return value;
  return { ...value, theme: "light", resolvedTheme: "light" };
}
