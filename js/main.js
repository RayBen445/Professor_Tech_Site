// js/main.js

// Sidebar toggle
const menu = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  sidebar.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menu.contains(e.target)) {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("show");
  }
});

// Gradient background cycling (only for light mode)
let currentGradient = 0;
setInterval(() => {
  if (document.body.getAttribute("data-theme") === "light") {
    document.body.style.backgroundImage = gradients[currentGradient];
    currentGradient = (currentGradient + 1) % gradients.length;
  }
}, Math.floor(Math.random() * 10000 + 10000)); // 10–20 seconds

// Dummy Bible data for Genesis 1 and 2
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

// Load Bible verses
function loadVerses() {
  const book = document.getElementById("book-select").value;
  const chapter = document.getElementById("chapter-select").value;
  const verses = bible[book]?.[chapter];
  const display = document.getElementById("verse-display");
  display.innerHTML = verses
    ? Object.entries(verses).map(([v, t]) => `<p><b>${v}</b>: ${t}</p>`).join("")
    : "<p>No data</p>";
}

// Populate Bible book and chapter dropdowns
document.addEventListener("DOMContentLoaded", () => {
  const bookSel = document.getElementById("book-select");
  const chapSel = document.getElementById("chapter-select");

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

  bookSel.dispatchEvent(new Event("change"));
});
