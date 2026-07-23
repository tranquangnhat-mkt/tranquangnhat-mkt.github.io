const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const toast = document.getElementById("toast");

function setLanguage(language) {
  root.lang = language;
  document.querySelectorAll("[data-en][data-vi]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  langToggle.textContent = language === "en" ? "VI" : "EN";
  localStorage.setItem("portfolio-language", language);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
root.dataset.theme = savedTheme;
themeToggle.textContent = savedTheme === "dark" ? "☀" : "☾";
themeToggle.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", theme);
});

setLanguage(localStorage.getItem("portfolio-language") || "en");
langToggle.addEventListener("click", () => setLanguage(root.lang === "en" ? "vi" : "en"));
menuToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => mobileNav.classList.remove("open")));

document.getElementById("cvButton").addEventListener("click", () => {
  showToast(root.lang === "vi"
    ? "CV chưa được đính kèm. Nút sẽ hoạt động sau khi thêm file PDF chính thức."
    : "The résumé has not been attached yet. This button will work once the final PDF is added.");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("scroll", () => {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scrollProgress").style.width = `${pageHeight > 0 ? window.scrollY / pageHeight * 100 : 0}%`;
});
