// js/main.js
import { loadAll, loadMetaRaids, loadMetaPvp } from "./api/sheets.js";
import { renderRaids } from "./render/raids.js";
import { renderEggs } from "./render/eggs.js";
import { renderRocket } from "./render/rocket.js";
import { renderMetaRaids, renderMetaPvp } from "./render/meta.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    setupMobileNav(); // <<< init burger/drawer

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
    // other pages: static
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

/* ===== Mobile nav toggle ===== */
function setupMobileNav() {
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("nav-drawer");
  if (!burger || !drawer) return;

  const open = () => {
    drawer.hidden = false;
    document.documentElement.classList.add("navlock");
    burger.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    drawer.hidden = true;
    document.documentElement.classList.remove("navlock");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => (drawer.hidden ? open() : close()));
  drawer.addEventListener("click", (e) => {
    if (e.target.matches(".drawer-backdrop, [data-close]")) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) close();
  });
}
