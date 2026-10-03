document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("light-toggle");
  if (!button) return;
  syncThemeToggle();
  button.addEventListener("click", () => toggleTheme(document.documentElement.getAttribute("data-theme")));
});
