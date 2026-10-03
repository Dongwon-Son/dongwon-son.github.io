// Apply the saved theme in the head before the page is painted.
let syncThemeToggle = () => {
  const button = document.getElementById("light-toggle");
  if (!button) return;
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.setAttribute("aria-pressed", String(dark));
};
let setHighlight = (theme) => {
  const light = document.getElementById("highlight_theme_light");
  const dark = document.getElementById("highlight_theme_dark");
  if (light) light.media = theme === "dark" ? "none" : "";
  if (dark) dark.media = theme === "dark" ? "" : "none";
};
let transTheme = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("transition");
  window.setTimeout(() => document.documentElement.classList.remove("transition"), 500);
};
let setTheme = (theme, persist = true) => {
  if (persist) transTheme();
  document.documentElement.setAttribute("data-theme", theme);
  setHighlight(theme);
  syncThemeToggle();
  if (persist) {
    try { localStorage.setItem("theme", theme); } catch (_) { /* Session-only if storage is blocked. */ }
  }
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color").trim() + "ee"});
  }
};
let toggleTheme = (theme) => setTheme(theme === "dark" ? "light" : "dark");
let initTheme = () => {
  let saved;
  try { saved = localStorage.getItem("theme"); } catch (_) { /* Use the default. */ }
  setTheme(saved === "light" || saved === "dark" ? saved : "dark", false);
};
initTheme();
