// js/main.js
import { loadAll, loadMetaRaids, loadMetaPvp } from "./api/sheets.js";
import { renderRaids } from "./render/raids.js";
import { renderEggs } from "./render/eggs.js";
import { renderRocket } from "./render/rocket.js";
import { renderMetaRaids, renderMetaPvp } from "./render/meta.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
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
