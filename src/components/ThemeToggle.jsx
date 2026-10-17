import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "فعال کردن تم روشن" : "فعال کردن تم تاریک"}
      title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
      className="flex items-center justify-center rounded-full
      border border-[var(--border-color)]
      bg-[var(--bg-tertiary)] p-2.5
      text-[var(--text-primary)]
      transition-colors hover:opacity-80"
    >
      {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}

export default ThemeToggle;
