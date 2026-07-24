(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const scrollProgress = document.getElementById("scrollProgress");

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) root.dataset.theme = savedTheme;

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const dark = root.dataset.theme === "dark";
    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
  };

  updateThemeLabel();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeLabel();
  });

  menuToggle?.addEventListener("click", () => {
    const open = mobileNav?.classList.toggle("open") || false;
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const updateProgress = () => {
    if (!scrollProgress) return;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll("video").forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    });
  });
})();
