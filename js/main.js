// js/main.js
import { loadAll, loadMetaRaids, loadMetaPvp } from "./api/sheets.js";
import { renderRaids } from "./render/raids.js";
import { renderEggs } from "./render/eggs.js";
import { renderRocket } from "./render/rocket.js";
import { renderMetaRaids, renderMetaPvp } from "./render/meta.js";

/* =========================
   Mobile nav (hamburger)
   ========================= */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("nav-drawer");
  if (!toggle || !drawer) return;

  const sheet = drawer.querySelector(".nav-sheet");
  const closers = drawer.querySelectorAll("[data-close], .nav-sheet a");

  function open() {
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add("open"));
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    sheet?.querySelector("a,button")?.focus?.();
  }
  function close() {
    drawer.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => {
      drawer.hidden = true;
    }, 180);
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    expanded ? close() : open();
  });
  closers.forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) close();
  });
}

/* =========================
   Page boot
   ========================= */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    initMobileNav();

    const page = document
      .querySelector("[data-page]")
      ?.getAttribute("data-page");

    if (page === "raids" || page === "eggs" || page === "rocket") {
      const { raids, eggs, rocket } = await loadAll();
      if (page === "raids") renderRaids(raids);
      if (page === "eggs") renderEggs(eggs);
      if (page === "rocket") renderRocket(rocket);
      return;
    }

    if (page === "meta-raids") {
      const meta = await loadMetaRaids();
      renderMetaRaids(meta);
      return;
    }

    if (page === "meta-pvp") {
      const meta = await loadMetaPvp();
      renderMetaPvp(meta);
      return;
    }

    // other static pages don't need JS
  } catch (e) {
    console.error("Load error", e);
    const page = document.querySelector("[data-page]");
    page
      ?.querySelector(".lead")
      ?.insertAdjacentHTML(
        "afterend",
        `<div class="small" style="color:#fca5a5">Fehler beim Laden der Daten. Bitte neu laden.</div>`
      );
  }
});
