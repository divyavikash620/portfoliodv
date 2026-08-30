import { useTheme } from "./ThemeProvider.jsx";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative flex h-7 w-[52px] items-center rounded-full border border-border bg-surface px-1 transition-colors hover:border-border-strong"
    >
      <span
        className="h-5 w-5 rounded-full bg-accent transition-transform duration-500"
        style={{ transform: isDark ? "translateX(0)" : "translateX(24px)" }}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-[9px] font-mono text-[9px] text-muted-foreground">
        <span style={{ opacity: isDark ? 0 : 1 }}>D</span>
        <span style={{ opacity: isDark ? 1 : 0 }}>L</span>
      </span>
    </button>
  );
}
