(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll("[data-language]");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const siteHeader = document.getElementById("siteHeader");
  const scrollProgress = document.getElementById("scrollProgress");

  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_) {
        // The page remains fully usable when storage is unavailable.
      }
    }
  };

  function setLanguage(language) {
    const nextLanguage = language === "en" ? "en" : "vi";
    root.lang = nextLanguage;

    document.querySelectorAll("[data-vi][data-en]").forEach((element) => {
      element.textContent = element.dataset[nextLanguage];
    });

    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === nextLanguage));
    });

    document.title = nextLanguage === "vi"
      ? "Ông Chú Plant-Based | Trần Quang Nhật"
      : "Ông Chú Plant-Based | Tran Quang Nhat";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = nextLanguage === "vi"
        ? "Case study Ông Chú Plant-Based — xây dựng và chuẩn hóa hệ thống nội dung video ngắn đa nền tảng cho thương hiệu Vinamit."
        : "Ông Chú Plant-Based case study — building and standardizing a multi-platform short-form content system for Vinamit.";
    }

    safeStorage.set("ocpb-language", nextLanguage);
  }

  function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    if (themeToggle) themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
    safeStorage.set("portfolio-theme", nextTheme);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  const videos = Array.from(document.querySelectorAll("video"));
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
      });
    });
  });

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    if (siteHeader) siteHeader.classList.toggle("is-scrolled", scrollTop > 40);
  }

  setLanguage(safeStorage.get("ocpb-language") || "vi");
  setTheme(safeStorage.get("portfolio-theme") || "light");
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });
})();
