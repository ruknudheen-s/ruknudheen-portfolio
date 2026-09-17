function syncThemeButton(theme) {
  const button = document.getElementById("themeToggle");
  const sun = document.getElementById("themeIconSun");
  const moon = document.getElementById("themeIconMoon");
  const isDark = theme === "dark";

  button.setAttribute("aria-pressed", String(isDark));
  button.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
  sun.style.display = isDark ? "none" : "block";
  moon.style.display = isDark ? "block" : "none";
}

export function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (systemDark ? "dark" : "light");

  root.setAttribute("data-theme", theme);
  syncThemeButton(theme);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeButton(next);
  });
}
