(() => {
  const root = document.documentElement;
  const body = document.body;
  const langToggle = document.getElementById("langToggle");
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const progress = document.getElementById("scrollProgress");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setLanguage(language) {
    const nextLanguage = language === "en" ? "en" : "vi";
    root.lang = nextLanguage;
    document.querySelectorAll("[data-vi][data-en]").forEach((element) => {
      element.textContent = element.dataset[nextLanguage];
    });
    document.querySelectorAll("[data-vi-html][data-en-html]").forEach((element) => {
      element.innerHTML = element.dataset[`${nextLanguage}Html`];
    });
    document.querySelectorAll("[data-alt-vi][data-alt-en]").forEach((element) => {
      element.alt = element.dataset[nextLanguage === "vi" ? "altVi" : "altEn"];
    });
    document.querySelectorAll("[data-lang-option]").forEach((element) => {
      element.classList.toggle("active", element.dataset.langOption === nextLanguage);
    });
    if (body.dataset.titleVi && body.dataset.titleEn) {
      document.title = nextLanguage === "vi" ? body.dataset.titleVi : body.dataset.titleEn;
    }
    localStorage.setItem("portfolio-language", nextLanguage);
  }

  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  root.dataset.theme = savedTheme;
  if (themeToggle) themeToggle.textContent = savedTheme === "dark" ? "☀" : "☾";

  langToggle?.addEventListener("click", () => setLanguage(root.lang === "vi" ? "en" : "vi"));
  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
    localStorage.setItem("portfolio-theme", nextTheme);
  });
  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileNav?.classList.toggle("open") || false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  setLanguage(localStorage.getItem("portfolio-language") || "vi");

  function updateProgress() {
    if (!progress) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const viewport = carousel.querySelector(".v22-carousel-viewport");
    const previous = carousel.querySelector('[data-carousel-action="previous"]');
    const next = carousel.querySelector('[data-carousel-action="next"]');
    if (!viewport) return;

    const originalSlides = Array.from(viewport.children);
    const leadingClones = originalSlides.map((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      return clone;
    });
    viewport.prepend(...leadingClones);
    originalSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      viewport.appendChild(clone);
    });

    let paused = reduceMotion;
    let resumeTimer = 0;
    let previousTime = performance.now();
    const speed = Number(carousel.dataset.speed || 22);

    const pauseTemporarily = (duration = 1800) => {
      paused = true;
      window.clearTimeout(resumeTimer);
      if (!reduceMotion) resumeTimer = window.setTimeout(() => { paused = false; }, duration);
    };

    const normalizePosition = () => {
      const boundary = viewport.scrollWidth / 3;
      if (boundary <= 0) return;
      if (viewport.scrollLeft >= boundary * 2) viewport.scrollLeft -= boundary;
      if (viewport.scrollLeft < boundary * 0.5) viewport.scrollLeft += boundary;
    };

    const animate = (currentTime) => {
      const delta = Math.min(48, currentTime - previousTime);
      previousTime = currentTime;
      if (!paused && !document.hidden) {
        viewport.scrollLeft += speed * delta / 1000;
        normalizePosition();
      }
      requestAnimationFrame(animate);
    };

    ["pointerdown", "touchstart", "wheel", "focusin"].forEach((eventName) => {
      viewport.addEventListener(eventName, () => pauseTemporarily(), { passive: true });
    });
    viewport.addEventListener("scroll", normalizePosition, { passive: true });
    previous?.addEventListener("click", () => {
      pauseTemporarily();
      viewport.scrollBy({ left: -viewport.clientWidth * 0.72, behavior: "smooth" });
    });
    next?.addEventListener("click", () => {
      pauseTemporarily();
      viewport.scrollBy({ left: viewport.clientWidth * 0.72, behavior: "smooth" });
    });
    viewport.scrollLeft = viewport.scrollWidth / 3;
    requestAnimationFrame(animate);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector(".v22-lightbox-caption");
  const lightboxClose = lightbox?.querySelector("button");
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxClose) lightboxClose.disabled = true;
    body.style.overflow = "";
  };
  document.querySelectorAll("img[data-lightbox]").forEach((image) => {
    if (image.closest('[aria-hidden="true"]')) return;
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    const open = () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (lightboxCaption) lightboxCaption.textContent = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (lightboxClose) lightboxClose.disabled = false;
      body.style.overflow = "hidden";
      lightboxClose?.focus();
    };
    image.addEventListener("click", open);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll("video").forEach((other) => { if (other !== video) other.pause(); });
    });
  });
})();
