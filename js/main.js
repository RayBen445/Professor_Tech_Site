document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const themeToggle = document.getElementById("theme-toggle");
  const dtElement = document.querySelector(".datetime-location #datetime") || document.createElement("span");
  const locElement = document.querySelector(".datetime-location #location") || document.createElement("span");

  // Show datetime
  const datetimeSpan = document.createElement("span");
  datetimeSpan.id = "datetime";
  const locationSpan = document.createElement("span");
  locationSpan.id = "location";
  document.querySelector(".datetime-location").appendChild(datetimeSpan);
  document.querySelector(".datetime-location").appendChild(locationSpan);

  function updateTime() {
    datetimeSpan.textContent = new Date().toLocaleString();
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Location with fallback
  function updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          locationSpan.textContent = `Lat: ${pos.coords.latitude.toFixed(2)}, Long: ${pos.coords.longitude.toFixed(2)}`;
        },
        () => fallbackLocation()
      );
    } else {
      fallbackLocation();
    }
  }
  function fallbackLocation() {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        locationSpan.textContent = `${data.city}, ${data.country_name}`;
      })
      .catch(() => {
        locationSpan.textContent = "Location unavailable";
      });
  }
  updateLocation();

  // Menu toggle
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Hide menu on outside click
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove("show");
    }
  });

  // Theme toggle
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.body.classList.add("gradient-light");
      themeToggle.textContent = "🌙";
    } else {
      document.body.classList.remove("gradient-light");
      themeToggle.textContent = "🌞";
    }
  }

  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(newTheme);
  });
});
