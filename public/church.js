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
