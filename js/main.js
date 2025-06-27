
document.addEventListener("DOMContentLoaded", function () {
    const dtElement = document.getElementById("datetime");
    const locElement = document.getElementById("location");
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    function updateTime() {
        const now = new Date();
        dtElement.textContent = now.toLocaleString();
    }

    function updateLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                locElement.textContent = `Lat: ${pos.coords.latitude.toFixed(2)}, Long: ${pos.coords.longitude.toFixed(2)}`;
            }, () => {
                locElement.textContent = "Location unavailable";
            });
        } else {
            locElement.textContent = "Geolocation not supported";
        }
    }

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    updateTime();
    updateLocation();
    setInterval(updateTime, 1000);

    // Bible API fetch
    const bibleVersionSelect = document.getElementById("bible-version");
    const bibleTextDiv = document.getElementById("bible-text");

    bibleVersionSelect.addEventListener("change", () => {
        const version = bibleVersionSelect.value;
        const passage = "John 3:16";
        if (version === "kjv") {
            fetch(`https://bible-api.com/${encodeURIComponent(passage)}?translation=kjv`)
                .then(res => res.json())
                .then(data => {
                    bibleTextDiv.textContent = data.text;
                })
                .catch(err => {
                    bibleTextDiv.textContent = "Error loading Bible text.";
                });
        } else {
            bibleTextDiv.textContent = `Version "${version}" not supported via live API yet.`;
        }
    });

    // Load default verse
    bibleVersionSelect.dispatchEvent(new Event("change"));

    // Dictionary API fetch
    window.lookupWord = function () {
        const word = document.getElementById("dictionary-input").value;
        const resultDiv = document.getElementById("dictionary-result");
        if (!word) {
            resultDiv.textContent = "Please enter a word.";
            return;
        }
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    const meaning = data[0].meanings[0].definitions[0].definition;
                    resultDiv.textContent = `${word}: ${meaning}`;
                } else {
                    resultDiv.textContent = "Definition not found.";
                }
            })
            .catch(err => {
                resultDiv.textContent = "Error fetching definition.";
            });
    }

    // Music Search Stub
    window.searchMusic = function () {
        const query = document.getElementById("music-search").value;
        const resultDiv = document.getElementById("music-result");
        if (query) {
            const searchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            resultDiv.innerHTML = `<a href="${searchURL}" target="_blank">Search YouTube for "${query}"</a>`;
        }
    }
});
