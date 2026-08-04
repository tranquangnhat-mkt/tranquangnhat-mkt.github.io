(() => {
  const header = document.getElementById("siteHeader");
  const navLinks = Array.from(document.querySelectorAll(".smeg-case-nav a"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if ("IntersectionObserver" in window && navLinks.length) {
    const linksById = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
    const sections = Array.from(linksById.keys())
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link === linksById.get(visible.target.id)));
    }, { rootMargin: "-24% 0px -58% 0px", threshold: [0, .2, .5] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || reduceMotion) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });
})();
