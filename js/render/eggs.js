// js/render/eggs.js
// Compact Eggs page with colored egg dots and fixed sprite sizes.

import { imageURL } from "../utils/images.js";

// map km → CSS class for the colored dot
function eggDotClass(km) {
  const k = String(km || "").trim();
  if (k === "2") return "egg-2";
  if (k === "5") return "egg-5";
  if (k === "7") return "egg-7";
  if (k === "10") return "egg-10";
  if (k === "12") return "egg-12";
  return "egg-2";
}

export function renderEggs(payload) {
  // Root can be #eggs-root (preferred) or #eggs (legacy)
  const root =
    document.getElementById("eggs-root") || document.getElementById("eggs");
  if (!root) return;

  root.innerHTML = "";

  // payload expected from sheets.js:
  // { eggs: { '2km':{pokemon:[...]}, '5km':{pokemon:[...]}, ... }, last_updated: ... }
  const eggs = payload?.eggs || {};
  const order = ["2km", "5km", "7km", "10km", "12km"];

  order.forEach((key) => {
    const block = eggs[key];
    if (!block || !Array.isArray(block.pokemon) || !block.pokemon.length)
      return;

    const km = key.replace("km", "");

    // build each Pokémon row
    const rowsHtml = block.pokemon
      .map((p) => {
        const img = imageURL({ id: p.id, slug: p.slug, image: p.image });
        const dex = p.id ? `#${p.id}` : "";
        return `
        <div class="egg-row">
          <img class="poke-icon" loading="lazy" src="${img}" alt="${p.name}">
          <div class="egg-text">
            <div class="name">${p.name}</div>
            ${dex ? `<div class="small egg-dex">${dex}</div>` : ""}
          </div>
        </div>
      `;
      })
      .join("");

    // section card
    const card = document.createElement("section");
    card.className = "section eggs-section";
    card.innerHTML = `
      <div class="egg-header">
        <span class="eggdot ${eggDotClass(km)}"></span>
        <h2 class="name egg-title">${km}km-Eier</h2>
      </div>
      <div class="egg-list">
        ${rowsHtml}
      </div>
    `;
    root.appendChild(card);
  });

  // remove any "loading" lead text if present
  root.querySelector(".lead")?.remove();
}
