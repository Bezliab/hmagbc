//  JAVASCRIPT

// Page navigation

// Mobile menu
function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
}

// Sticky nav shadow
window.addEventListener("scroll", () => {
  document
    .getElementById("nav")
    .classList.toggle("scrolled", window.scrollY > 10);
});

// Wire map fallback and Open in Google Maps link on contact page
document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-contact");
  if (!page) return;
  const addressEl = document.getElementById("contact-address");
  const openLink = document.getElementById("open-google-maps");
  const iframe = document.getElementById("contact-map-iframe");
  const fallback = document.getElementById("map-fallback");

  if (addressEl && openLink) {
    const addr = addressEl.innerText
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const q = encodeURIComponent(addr);
    openLink.href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  if (iframe) {
    // show fallback if iframe doesn't load within 6s
    let loaded = false;
    const timeout = setTimeout(() => {
      if (!loaded) {
        try {
          iframe.style.display = "none";
        } catch (e) {}
        if (fallback) fallback.style.display = "block";
      }
    }, 6000);
    iframe.addEventListener("load", () => {
      loaded = true;
      clearTimeout(timeout);
      if (fallback) fallback.style.display = "none";
      iframe.style.display = "";
    });
  }
});

// Random Bible verse loader (fetches a random verse and updates the home quote)
function loadRandomVerse() {
  const verseEl = document.getElementById("inspirational-verse");
  const refEl = document.getElementById("inspirational-ref");
  if (!verseEl || !refEl) return;
  // show loading state
  const previous = verseEl.textContent;
  verseEl.textContent = "Loading verse...";
  refEl.textContent = "";

  fetch("https://labs.bible.org/api/?passage=random&type=json")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0)
        throw new Error("No verse returned");
      const v = data[0];
      // API returns plain text in `text` and metadata bookname/chapter/verse
      const text = (v.text || "").replace(/\s+/g, " ").trim();
      verseEl.textContent = text || previous;
      const version = v.version || "KJV";
      refEl.textContent = `${v.bookname} ${v.chapter}:${v.verse} · ${version}`;
    })
    .catch((err) => {
      console.error("loadRandomVerse error:", err);
      verseEl.textContent =
        previous ||
        "For where two or three are gathered together in my name, there am I in the midst of them.";
      refEl.textContent = "Matthew 18:20 · King James Version";
    });
}

// Wire random verse loader on the home page (initial load + click to refresh)
document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-home");
  if (!page) return;
  // initial load
  loadRandomVerse();
  // clicking the quote decor or the verse toggles a new random verse
  const decor = document.getElementById("quote-decor");
  if (decor) decor.addEventListener("click", loadRandomVerse);
  const verseBlock = document.getElementById("inspirational-verse");
  if (verseBlock) {
    verseBlock.style.cursor = "pointer";
    verseBlock.addEventListener("click", loadRandomVerse);
  }
});

// Event filter
let currentCat = "all";
function filterEvents(cat, btn) {
  if (cat !== undefined) currentCat = cat;
  if (btn) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }
  const search =
    document.getElementById("event-search")?.value?.toLowerCase() || "";
  document.querySelectorAll("#events-grid .event-card").forEach((card) => {
    const matchCat = currentCat === "all" || card.dataset.cat === currentCat;
    const matchSearch =
      !search || card.innerText.toLowerCase().includes(search);
    card.style.display = matchCat && matchSearch ? "" : "none";
  });
}

// Admin login
function doLogin() {
  const email = document.getElementById("admin-email").value;
  const pass = document.getElementById("admin-pass").value;
  if (email === "admin@church.org" && pass === "admin123") {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-dashboard").style.display = "block";
    document.getElementById("login-error").style.display = "none";
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

function doLogout() {
  document.getElementById("admin-login").style.display = "flex";
  document.getElementById("admin-dashboard").style.display = "none";
  document.getElementById("admin-email").value = "";
  document.getElementById("admin-pass").value = "";
}

function showAdminPanel(id, navItem) {
  document
    .querySelectorAll(".admin-panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("panel-" + id).classList.add("active");
  document
    .querySelectorAll(".admin-nav-item")
    .forEach((n) => n.classList.remove("active"));
  if (navItem) navItem.classList.add("active");
}

// Contact form
function submitContact() {
  document.getElementById("contact-success").classList.add("show");
  setTimeout(
    () => document.getElementById("contact-success").classList.remove("show"),
    4000,
  );
}

// Filter btn toggle for non-event pages
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!this.hasAttribute("onclick")) {
      const parent = this.closest(".filter-bar");
      parent
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    }
  });
});

// Sermons filter (search + category)
function filterSermons(cat) {
  const container = document.getElementById("page-sermons");
  if (!container) return;
  const search = (
    container.querySelector(".filter-bar input")?.value || ""
  ).toLowerCase();
  const activeCat =
    (cat && cat !== "all") ||
    container
      .querySelector(".filter-bar .filter-btn.active")
      ?.textContent?.trim() ||
    "all";

  container.querySelectorAll(".sermon-item").forEach((item) => {
    const metaTag =
      item.querySelector(".card-tag")?.textContent?.trim().toLowerCase() || "";
    const matchesCat =
      activeCat === "all" || metaTag === activeCat.toLowerCase();
    const matchesSearch =
      !search || item.innerText.toLowerCase().includes(search);
    item.style.display = matchesCat && matchesSearch ? "" : "none";
  });
}

// Wire up sermons filter inputs/buttons when on sermons page
document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-sermons");
  if (!page) return;
  const input = page.querySelector(".filter-bar input");
  if (input) {
    input.addEventListener("input", () => filterSermons());
  }
  page.querySelectorAll(".filter-bar .filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // allow existing behaviour to toggle active class; then filter
      page
        .querySelectorAll(".filter-bar .filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterSermons(btn.textContent.trim());
    });
  });
});
