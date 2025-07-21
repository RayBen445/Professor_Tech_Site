// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("menu-toggle") || document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  // Show sidebar
  if (openBtn && sidebar) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
      sidebar.classList.remove("hidden");
    });
  }

  // Hide sidebar
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
      sidebar.classList.add("hidden");
    });
  }

  // Auto-close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      !openBtn.contains(e.target)
    ) {
      sidebar.classList.remove("show");
      sidebar.classList.add("hidden");
    }
  });

  // Animated background switching (for light theme)
  const gradients = [
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #ff5f6d, #ffc371)",
    "linear-gradient(to right, #7f00ff, #e100ff)",
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
  ];
  let currentGradient = 0;

  setInterval(() => {
    if (document.body.getAttribute("data-theme") === "light") {
      document.body.style.backgroundImage = gradients[currentGradient];
      currentGradient = (currentGradient + 1) % gradients.length;
    }
  }, Math.floor(Math.random() * 10000 + 10000)); // 10–20 sec
});
