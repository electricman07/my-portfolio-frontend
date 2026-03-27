import { useState, useEffect } from "react";
import { FaSun, FaRegMoon } from "react-icons/fa6";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 1. Wait until the component is mounted on the client
  useEffect(() => {
    setMounted(true);
    // Now it's safe to check the actual DOM state
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newDark = !isDark;

    setIsDark(newDark);
    const theme = newDark ? "dark" : "light";

    // Update DOM
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);

    // Save to LocalStorage for your THEME_INIT_SCRIPT to find later
    localStorage.setItem("theme", theme);
  };

  // 2. Prevent rendering the icon until we are sure which one to show
  // This prevents the icon from being "stuck" or "flickering"
  if (!mounted) {
    return <div className="h-10 w-10" />; // Empty placeholder during hydration
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all active:scale-95"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <span className="h-5 w-5 text-yellow-500 animate-in zoom-in duration-300">
          <FaSun />
        </span>
      ) : (
        <span className="h-5 w-5 text-slate-500 animate-in zoom-in duration-300">
          <FaRegMoon />
        </span>
      )}
    </button>
  );
}
