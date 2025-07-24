// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("closeSidebar");

  // Toggle Sidebar
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      sidebar.classList.toggle("hidden");
    });
  }

  // Close Button
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
      sidebar.classList.add("hidden");
    });
  }

  // Auto-hide when clicking outside
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

  // 🌈 Animated background for light theme
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
});
