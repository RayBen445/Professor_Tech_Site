// js/main.js
// Sidebar toggle for all pages
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("menu-toggle") || document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (openBtn && sidebar) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }

  // Auto-close sidebar when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !openBtn.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  // Load Genesis 1–2 sample Bible data
  if (document.getElementById("book-select")) {
    const bible = {
      "Genesis": {
        "1": {
          "1": "In the beginning God created the heaven and the earth.",
          "2": "And the earth was without form, and void; and darkness was upon the face of the deep..."
        },
        "2": {
          "1": "Thus the heavens and the earth were finished, and all the host of them.",
          "2": "And on the seventh day God ended his work which he had made..."
        }
      }
    };

    const bookSel = document.getElementById("book-select");
    const chapSel = document.getElementById("chapter-select");
    const display = document.getElementById("verse-display");

    for (let book in bible) {
      bookSel.innerHTML += `<option value="${book}">${book}</option>`;
    }

    bookSel.addEventListener("change", () => {
      chapSel.innerHTML = "";
      const chapters = bible[bookSel.value];
      for (let ch in chapters) {
        chapSel.innerHTML += `<option value="${ch}">${ch}</option>`;
      }
    });

    chapSel.addEventListener("change", () => {
      const verses = bible[bookSel.value]?.[chapSel.value];
      display.innerHTML = verses
        ? Object.entries(verses).map(([v, t]) => `<p><b>${v}</b>: ${t}</p>`).join("")
        : "<p>No data</p>";
    });

    bookSel.dispatchEvent(new Event("change"));
    chapSel.dispatchEvent(new Event("change"));
  }

  // Animated background (only if data-theme is light)
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
  }, Math.floor(Math.random() * 10000 + 10000)); // every 10–20 seconds
});
