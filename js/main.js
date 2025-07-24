document.addEventListener("DOMContentLoaded", () => {
  // === Sidebar Toggle ===
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("closeSidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      sidebar.classList.toggle("hidden");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
      sidebar.classList.add("hidden");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      sidebar.classList.remove("show");
      sidebar.classList.add("hidden");
    }
  });

  // === Animated Background (Light Theme Only) ===
  const gradients = [
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #ff5f6d, #ffc371)",
    "linear-gradient(to right, #7f00ff, #e100ff)",
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
  ];
  let current = 0;

  setInterval(() => {
    const theme = document.body.getAttribute("data-theme");
    if (theme === "light") {
      document.body.style.backgroundImage = gradients[current];
      current = (current + 1) % gradients.length;
    }
  }, Math.floor(Math.random() * 10000 + 10000)); // Switch every 10–20s

  // === Banner Typing Animation ===
  const bannerEl = document.querySelector(".typed-text");
  const bannerCursor = document.querySelector(".cursor");
  const bannerPhrases = [
    "AI Systems Developer",
    "Telegram Bot Engineer",
    "Node.js Enthusiast",
    "GPT API Integrator",
    "SQLite + Termux Master"
  ];
  let i = 0, j = 0, isDeletingBanner = false;

  function typeBanner() {
    const current = bannerPhrases[i];
    bannerEl.textContent = isDeletingBanner
      ? current.substring(0, j--)
      : current.substring(0, j++);

    if (!isDeletingBanner && j === current.length) {
      isDeletingBanner = true;
      setTimeout(typeBanner, 1500);
      return;
    } else if (isDeletingBanner && j === 0) {
      isDeletingBanner = false;
      i = (i + 1) % bannerPhrases.length;
    }

    setTimeout(typeBanner, isDeletingBanner ? 60 : 100);
  }

  if (bannerEl) typeBanner();

  // === About Section Typing Animation ===
  const aboutEl = document.getElementById("about-text");
  const aboutCursor = document.querySelector(".cursor-alt");
  const aboutPhrases = [
    "I'm Professor 👨‍🏫📚 — Developer, Economics Student, and AI Architect.",
    "I love building intelligent bots, economic systems, and automated tech.",
    "My tools include Termux, GPT APIs, Node.js, and SQLite databases."
  ];
  let a = 0, b = 0, isDeletingAbout = false;

  function typeAbout() {
    const current = aboutPhrases[a];
    aboutEl.textContent = isDeletingAbout
      ? current.substring(0, b--)
      : current.substring(0, b++);

    if (!isDeletingAbout && b === current.length) {
      isDeletingAbout = true;
      setTimeout(typeAbout, 1800);
      return;
    } else if (isDeletingAbout && b === 0) {
      isDeletingAbout = false;
      a = (a + 1) % aboutPhrases.length;
    }

    setTimeout(typeAbout, isDeletingAbout ? 50 : 90);
  }

  if (aboutEl) setTimeout(typeAbout, 2000); // Delay to avoid banner clash
});
// === Scroll-Activated Navigation Highlight ===
const navLinks = document.querySelectorAll("#sidebar nav a");
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute("href").replace("#", "");
  return document.getElementById(id);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`#sidebar nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  },
  { rootMargin: "-50% 0px -45% 0px", threshold: 0.5 }
);

sections.forEach((section) => {
  if (section) observer.observe(section);
});

// === Theme Switcher ===
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
  });
}

// === Scroll-Linked Active Navigation ===
const navLinks = document.querySelectorAll("#sidebar nav a");
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute("href")?.replace("#", "");
  return document.getElementById(id);
}).filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = document.querySelector(`#sidebar nav a[href="#${id}"]`);
      if (entry.isIntersecting && link) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-50% 0px -45% 0px", threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));
