// js/render/raids.js
export function renderRaids(raids) {
  const root = document.getElementById("raids-root");
  if (!root) return;
  root.innerHTML = "";

  // section builder
  const section = (title, items = []) => {
    if (!items.length) return "";
    const cards = items
      .map(
        (it) => `
      <div class="card-raid">
        <div class="mon">
          <img loading="lazy" src="${it.image}" alt="${it.name}" />
          <div>
            <div class="title">${it.name}</div>
            <div class="meta">${it.tier || "Raid"}</div>
            ${
              it.start || it.end
                ? `<div class="small">🕑 ${[it.start, it.end]
                    .filter(Boolean)
                    .join(" – ")}</div>`
                : ""
            }
            ${
              it.counters_hint
                ? `<div class="small">💡 ${it.counters_hint}</div>`
                : ""
            }
          </div>
        </div>
      </div>
    `
      )
      .join("");

    return `
      <div class="h2">${title}</div>
      <div class="grid-cards">${cards}</div>
    `;
  };

  const html = `
    ${section("Legendäre / 5★", raids.five_star.active)}
    ${section("Mega-Raids", raids.mega_raids.active)}
    ${
      raids.shadow_raids.five_star_weekend
        ? `
      <div class="h2">Shadow-Raid – Wochenende</div>
      <div class="card-raid">
        <div class="mon">
          <img loading="lazy" src="${
            raids.five_star.active[0]?.image || "images/placeholder.png"
          }" alt="Shadow Raid" />
          <div>
            <div class="title">${
              raids.shadow_raids.five_star_weekend.name
            }</div>
            <div class="meta">${raids.shadow_raids.five_star_weekend.tier}</div>
            <div class="small">🗓️ ${
              raids.shadow_raids.five_star_weekend.schedule
            }</div>
          </div>
        </div>
      </div>
    `
        : ""
    }
    <div class="small" style="margin-top:10px;opacity:.8">Aktualisiert: ${new Date(
      raids.last_updated
    ).toLocaleString("de-DE")}</div>
  `;

  root.insertAdjacentHTML("beforeend", html);
}
